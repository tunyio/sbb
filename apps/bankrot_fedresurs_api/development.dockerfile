FROM node:22.9.0-alpine3.20

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /project_root/apps/bankrot_fedresurs_api

RUN apk add \
    curl \
    git \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

RUN mkdir -p /bin && curl -fsSL "https://github.com/pnpm/pnpm/releases/download/v9.11.0/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

ENV PATH /project_root/node_modules/.bin:$PATH

RUN apk add --no-cache postgresql-client

# RUN apk add --no-cache chromium
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

CMD NODE_OPTIONS="--max-old-space-size=12288" turbo dev --filter=bankrot_fedresurs_api...
