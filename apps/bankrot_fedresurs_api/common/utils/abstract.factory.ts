import { Type } from '@nestjs/common';
import { AllNames, MethodNames, PropertyNames } from '../typing/utils';

const TS_PARAM_TYPES = 'design:paramtypes';
const TS_TYPE = 'design:type';

export abstract class AbstractFactory<T> {
  abstract readonly product: Type<T>;

  defineType(target: AllNames<T>, type: any): this {
    Reflect.defineMetadata(TS_TYPE, type, this.product.prototype, target);
    return this;
  }

  defineParamTypes(target: MethodNames<T>, ...types: (Type | 'keep')[]): this {
    const primitive: Type[] =
      Reflect.getMetadata(TS_PARAM_TYPES, this.product.prototype, target) ?? [];
    const actualTypes = types.map((type, index) =>
      type == 'keep' ? primitive[index] : type
    );
    Reflect.defineMetadata(
      TS_PARAM_TYPES,
      actualTypes,
      this.product.prototype,
      target
    );
    return this;
  }

  applyClassDecorators(...decorators: ClassDecorator[]): this {
    decorators.forEach((d) => d(this.product));
    return this;
  }

  applyPropertyDecorators(
    target: PropertyNames<T>,
    ...decorators: PropertyDecorator[]
  ): this {
    decorators.forEach((d) => d(this.product.prototype, target));
    return this;
  }

  applyMethodDecorators(
    target: MethodNames<T>,
    ...decorators: MethodDecorator[]
  ): this {
    decorators.forEach((d) =>
      d(
        this.product.prototype,
        target,
        this.getDescriptor(this.product.prototype, target)!
      )
    );
    return this;
  }

  applyDecoratorsByMethods(map: {
    [key: string]: {
      decorators: MethodDecorator[];
    };
  }) {
    for (const [method, opts] of Object.entries(map)) {
      this.applyMethodDecorators(method as MethodNames<T>, ...opts.decorators);
    }
  }

  applyAllDecoratorsToMethods(
    methodNames: Array<MethodNames<T>>,
    ...decorators: MethodDecorator[]
  ) {
    for (const method of methodNames) {
      this.applyMethodDecorators(method, ...decorators);
    }

    return this;
  }

  applyParamDecorators(
    target: MethodNames<T>,
    index: number,
    ...decorators: ParameterDecorator[]
  ): this {
    decorators.forEach((d) => d(this.product.prototype, target, index));
    return this;
  }

  applyParamDecoratorSets(
    target: MethodNames<T>,
    ...decoratorSets: ParameterDecorator[][]
  ): this {
    decoratorSets.forEach((decorators, index) =>
      this.applyParamDecorators(target, index, ...decorators)
    );
    return this;
  }

  getDescriptor(
    prototype: { __proto__: typeof prototype | null },
    target: PropertyKey
  ): PropertyDescriptor | undefined {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, target);
    if (descriptor) return descriptor;
    if (prototype.__proto__ == null) return;
    return this.getDescriptor(prototype.__proto__, target);
  }
}
