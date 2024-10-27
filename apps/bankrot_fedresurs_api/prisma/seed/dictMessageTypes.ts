import { Prisma } from '@prisma/client';

export const dictMessageTypes: Prisma.DictMessageTypesCreateInput[] = [
  {
    title: 'Сообщение о судебном акте',
    code: 'soobshchenie_o_sudebnom_akte'
  },
  {
    title: 'Уведомление о получении требований кредитора',
    code: 'uvedomlenie_o_poluchenii_trebovanii_kreditora'
  },
  {
    title: 'Сведения об осуществлении внеочередных расходов',
    code: 'svedeniya_ob_osushchestvlenii_vneocherednikh_raskhodov'
  },
  {
    title: 'Иное сообщение',
    code: 'inoe_soobshchenie'
  },
  {
    title: 'Аннулирование ранее опубликованного сообщения',
    code: 'annulirovanie_ranee_opublikovannogo_soobshcheniya'
  },
  {
    title: 'Решения арбитражного суда',
    code: 'resheniya_arbitrazhnogo_suda',
    other_DictMessageTypes: {
      create: [
        {
          title: 'Объявление о принятии арбитражным судом заявления',
          code: 'obyavlenie_o_prinyatii_arbitrazhnim_sudom_zayavleniya'
        },
        {
          title: 'Опровержение по решению суда опубликованных ранее сведений',
          code: 'oproverzhenie_po_resheniyu_suda_opublikovannikh_ranee_svedenii'
        },
        {
          title: 'Сообщение о дисквалификации арбитражного управляющего',
          code: 'soobshchenie_o_diskvalifikatsii_arbitrazhnogo_upravlyayushchego'
        }
      ]
    }
  },
  {
    title: 'Собрания и комитеты кредиторов',
    code: 'sobraniya_i_komiteti_kreditorov',
    other_DictMessageTypes: {
      create: [
        {
          title: 'Сообщение о собрании кредиторов',
          code: 'soobshchenie_o_sobranii_kreditorov'
        },
        {
          title: 'Сообщение о результатах проведения собрания кредиторов',
          code: 'soobshchenie_o_rezultatakh_provedeniya_sobraniya_kreditorov'
        },
        {
          title: 'Уведомление о проведении комитета кредиторов',
          code: 'uvedomlenie_o_provedenii_komiteta_kreditorov'
        },
        {
          title: 'Сообщение о результатах проведения комитета кредиторов',
          code: 'soobshchenie_o_rezultatakh_provedeniya_komiteta_kreditorov'
        }
      ]
    }
  },
  {
    title: 'Сообщения для участников строительства',
    code: 'soobshcheniya_dlya_uchastnikov_stroitelstva',
    other_DictMessageTypes: {
      create: [
        {
          title: 'Сведения о принятии заявления о признании должника банкротом',
          code: 'svedeniya_o_prinyatii_zayavleniya_o_priznanii_dolzhnika_bankrotom'
        },
        {
          title: 'Уведомление о проведении собрания участников строительства',
          code: 'uvedomlenie_o_provedenii_sobraniya_uchastnikov_stroitelstva'
        },
        {
          title:
            'Сообщение о результатах проведения собрания участников строительства',
          code: 'soobshchenie_o_rezultatakh_provedeniya_sobraniya_uchastnikov_stroitelstva'
        },
        {
          title:
            'Извещение участникам строительства о возможности предъявления требований',
          code: 'izveshchenie_uchastnikam_stroitelstva_o_vozmozhnosti_predyavleniya_trebovanii'
        },
        {
          title:
            'Сообщение о переходе права собственности на объект незавершенного строительства и прав на земельный участок',
          code: 'soobshchenie_o_perekhode_prava_sobstvennosti_na_obekt_nezavershennogo_stroitelstva_i_prav_na_zemelnii_uchastok'
        }
      ]
    }
  },
  {
    title: 'Сведения об активах',
    code: 'svedeniya_ob_aktivakh',
    other_DictMessageTypes: {
      create: [
        {
          title: 'Информация о финансовом состоянии',
          code: 'informatsiya_o_finansovom_sostoyanii'
        },
        {
          title: 'Объявление о возврате ценных бумаг и иного имущества',
          code: 'obyavlenie_o_vozvrate_tsennikh_bumag_i_inogo_imushchestva'
        },
        {
          title: 'Сведения о результатах инвентаризации имущества должника',
          code: 'svedeniya_o_rezultatakh_inventarizatsii_imushchestva_dolzhnika'
        },
        {
          title: 'Отчет оценщика об оценке имущества должника',
          code: 'otchet_otsenshchika_ob_otsenke_imushchestva_dolzhnika'
        },
        {
          title:
            'Уведомление о передаче страхового портфеля страховой организации',
          code: 'uvedomlenie_o_peredache_strakhovogo_portfelya_strakhovoi_organizatsii'
        },
        {
          title:
            'Сведения о кредитной организации, в которой открыт специальный банковский счет должника',
          code: 'svedeniya_o_kreditnoi_organizatsii_v_kotoroi_otkrit_spetsialnii_bankovskii_schet_dolzhnika'
        }
      ]
    }
  },
  {
    title: 'Организация и проведение реализации имущества',
    code: 'organizatsiya_i_provedenie_realizatsii_imushchestva',
    other_DictMessageTypes: {
      create: [
        {
          title: 'Объявление о проведении торгов',
          code: 'obyavlenie_o_provedenii_torgov'
        },
        {
          title: 'Сообщение о результатах торгов',
          code: 'soobshchenie_o_rezultatakh_torgov'
        },
        {
          title:
            'Об определении начальной продажной цены, утверждении порядка и условий проведения торгов по реализации предмета залога, порядка и условий обеспечения сохранности предмета залога',
          code: 'ob_opredelenii_nachalnoi_prodazhnoi_tseni_utverzhdenii_poryadka_i_uslovii_provedeniya_torgov_po_realizatsii_predmeta_zaloga_poryadka_i_uslovii_obespecheniya_sokhrannosti_predmeta_zaloga'
        },
        {
          title:
            'Сообщение об отмене сообщения об объявлении торгов или сообщения о результатах торгов',
          code: 'soobshchenie_ob_otmene_soobshcheniya_ob_obyavlenii_torgov_ili_soobshcheniya_o_rezultatakh_torgov'
        },
        {
          title: 'Сообщение об изменении объявления о проведении торгов',
          code: 'soobshchenie_ob_izmenenii_obyavleniya_o_provedenii_torgov'
        },
        {
          title: 'Сведения о заключении договора купли-продажи',
          code: 'svedeniya_o_zaklyuchenii_dogovora_kupli_prodazhi'
        },
        {
          title:
            'Объявление о наличии непроданного имущества и праве собственника имущества должника – унитарного предприятия, учредителей (участников) должника получить такое имущество',
          code: 'obyavlenie_o_nalichii_neprodannogo_imushchestva_i_prave_sobstvennika_imushchestva_dolzhnika_unitarnogo_predpriyatiya_uchreditelei_uchastnikov_dolzhnika_poluchit_takoe_imushchestvo'
        },
        {
          title:
            'Предложение о погашении требований кредиторов путем предоставления отступного',
          code: 'predlozhenie_o_pogashenii_trebovanii_kreditorov_putem_predostavleniya_otstupnogo'
        }
      ]
    }
  },
  {
    title: 'Собрание работников должника',
    code: 'sobranie_rabotnikov_dolzhnika',
    other_DictMessageTypes: {
      create: [
        {
          title:
            'Уведомление о проведении собрания работников, бывших работников должника',
          code: 'uvedomlenie_o_provedenii_sobraniya_rabotnikov_bivshikh_rabotnikov_dolzhnika'
        },
        {
          title:
            'Сведения о решениях, принятых собранием работников, бывших работников должника',
          code: 'svedeniya_o_resheniyakh_prinyatikh_sobraniem_rabotnikov_bivshikh_rabotnikov_dolzhnika'
        }
      ]
    }
  },
  {
    title: 'Оспаривание сделки',
    code: 'osparivanie_sdelki',
    other_DictMessageTypes: {
      create: [
        {
          title: 'Заявление о признании сделки должника недействительной',
          code: 'zayavlenie_o_priznanii_sdelki_dolzhnika_nedeistvitelnoi'
        },
        {
          title:
            'Судебный акт по результатам рассмотрения заявления об оспаривании сделки должника',
          code: 'sudebnii_akt_po_rezultatam_rassmotreniya_zayavleniya_ob_osparivanii_sdelki_dolzhnika'
        },
        {
          title:
            'Судебный акт по результатам пересмотра рассмотрения заявления об оспаривании сделки должника',
          code: 'sudebnii_akt_po_rezultatam_peresmotra_rassmotreniya_zayavleniya_ob_osparivanii_sdelki_dolzhnika'
        }
      ]
    }
  },
  {
    title: 'Ответственность контролирующих лиц',
    code: 'otvetstvennost_kontroliruyushchikh_lits',
    other_DictMessageTypes: {
      create: [
        {
          title:
            'Заявление о привлечении контролирующих должника лиц, а также иных лиц, к ответственности в виде возмещения убытков',
          code: 'zayavlenie_o_privlechenii_kontroliruyushchikh_dolzhnika_lits_a_takzhe_inikh_lits_k_otvetstvennosti_v_vide_vozmeshcheniya_ubitkov'
        },
        {
          title:
            'Судебный акт по результатам рассмотрения заявления о привлечении контролирующих должника лиц, а также иных лиц, к ответственности в виде возмещения убытков',
          code: 'sudebnii_akt_po_rezultatam_rassmotreniya_zayavleniya_o_privlechenii_kontroliruyushchikh_dolzhnika_lits_a_takzhe_inikh_lits_k_otvetstvennosti_v_vide_vozmeshcheniya_ubitkov'
        },
        {
          title:
            'Судебный акт по результатам пересмотра рассмотрения заявления о привлечении контролирующих должника лиц, а также иных лиц, к ответственности в виде возмещения убытков',
          code: 'sudebnii_akt_po_rezultatam_peresmotra_rassmotreniya_zayavleniya_o_privlechenii_kontroliruyushchikh_dolzhnika_lits_a_takzhe_inikh_lits_k_otvetstvennosti_v_vide_vozmeshcheniya_ubitkov'
        },
        {
          title:
            'Заявление о привлечении контролирующих должника лиц к субсидиарной ответственности',
          code: 'zayavlenie_o_privlechenii_kontroliruyushchikh_dolzhnika_lits_k_subsidiarnoi_otvetstvennosti'
        },
        {
          title:
            'Судебный акт по результатам рассмотрения заявления о привлечении контролирующих должника лиц к субсидиарной ответственности',
          code: 'sudebnii_akt_po_rezultatam_rassmotreniya_zayavleniya_o_privlechenii_kontroliruyushchikh_dolzhnika_lits_k_subsidiarnoi_otvetstvennosti'
        },
        {
          title:
            'Судебный акт по результатам пересмотра рассмотрения заявления о привлечении контролирующих должника лиц к субсидиарной ответственности',
          code: 'sudebnii_akt_po_rezultatam_peresmotra_rassmotreniya_zayavleniya_o_privlechenii_kontroliruyushchikh_dolzhnika_lits_k_subsidiarnoi_otvetstvennosti'
        },
        {
          title:
            'Сообщение о праве кредитора выбрать способ распоряжения правом требования о привлечении к субсидиарной ответственности',
          code: 'soobshchenie_o_prave_kreditora_vibrat_sposob_rasporyazheniya_pravom_trebovaniya_o_privlechenii_k_subsidiarnoi_otvetstvennosti'
        },
        {
          title:
            'Предложение о присоединении к заявлению о привлечении контролирующих лиц должника к субсидиарной ответственности',
          code: 'predlozhenie_o_prisoedinenii_k_zayavleniyu_o_privlechenii_kontroliruyushchikh_lits_dolzhnika_k_subsidiarnoi_otvetstvennosti'
        }
      ]
    }
  },
  {
    title: 'Сообщения по финансовым организациям',
    code: 'soobshcheniya_po_finansovim_organizatsiyam',
    other_DictMessageTypes: {
      create: [
        {
          title: 'Решение о назначении временной администрации',
          code: 'reshenie_o_naznachenii_vremennoi_administratsii'
        },
        {
          title: 'Изменение состава временной администрации',
          code: 'izmenenie_sostava_vremennoi_administratsii'
        },
        {
          title: 'Прекращение деятельности временной администрации',
          code: 'prekrashchenie_deyatelnosti_vremennoi_administratsii'
        },
        {
          title: 'Извещение о возможности предъявления требований',
          code: 'izveshchenie_o_vozmozhnosti_predyavleniya_trebovanii'
        },
        {
          title: 'Объявление о выплатах Банка России',
          code: 'obyavlenie_o_viplatakh_banka_rossii'
        },
        {
          title:
            'Сообщение о намерении исполнить обязательства кредитной организации',
          code: 'soobshchenie_o_namerenii_ispolnit_obyazatelstva_kreditnoi_organizatsii'
        },
        {
          title:
            'Сообщение о признании исполнения заявителем обязательств кредитной организации несостоявшимся',
          code: 'soobshchenie_o_priznanii_ispolneniya_zayavitelem_obyazatelstv_kreditnoi_organizatsii_nesostoyavshimsya'
        },
        {
          title: 'Сообщение об исполнении обязательств кредитной организации',
          code: 'soobshchenie_ob_ispolnenii_obyazatelstv_kreditnoi_organizatsii'
        },
        {
          title: 'Сообщение о преимущественном праве выкупа имущества',
          code: 'soobshchenie_o_preimushchestvennom_prave_vikupa_imushchestva'
        },
        {
          title: 'Сообщение об уменьшении размера уставного капитала банка',
          code: 'soobshchenie_ob_umenshenii_razmera_ustavnogo_kapitala_banka'
        },
        {
          title:
            'Сведения о проведении отбора приобретателей имущества (активов) и обязательств кредитной организации',
          code: 'svedeniya_o_provedenii_otbora_priobretatelei_imushchestva_aktivov_i_obyazatelstv_kreditnoi_organizatsii'
        },
        {
          title:
            'Сообщение о предстоящей передаче приобретателю имущества (активов) и обязательств кредитной организации или их части',
          code: 'soobshchenie_o_predstoyashchei_peredache_priobretatelyu_imushchestva_aktivov_i_obyazatelstv_kreditnoi_organizatsii_ili_ikh_chasti'
        },
        {
          title:
            'Сообщение о передаче приобретателю имущества и обязательств кредитной организации',
          code: 'soobshchenie_o_peredache_priobretatelyu_imushchestva_i_obyazatelstv_kreditnoi_organizatsii'
        },
        {
          title:
            'Сведения о смете текущих расходов кредитной организации или иной финансовой организации',
          code: 'svedeniya_o_smete_tekushchikh_raskhodov_kreditnoi_organizatsii_ili_inoi_finansovoi_organizatsii'
        },
        {
          title:
            'Сведения о скорректированной смете текущих расходов кредитной организации или иной финансовой организации',
          code: 'svedeniya_o_skorrektirovannoi_smete_tekushchikh_raskhodov_kreditnoi_organizatsii_ili_inoi_finansovoi_organizatsii'
        },
        {
          title: 'Сведения о порядке и сроках расчетов с кредиторами',
          code: 'svedeniya_o_poryadke_i_srokakh_raschetov_s_kreditorami'
        },
        {
          title: 'Информация о ходе конкурсного производства',
          code: 'informatsiya_o_khode_konkursnogo_proizvodstva'
        },
        {
          title:
            'Сведения об исполнении сметы текущих расходов и стоимости нереализованного имущества кредитной организации',
          code: 'svedeniya_ob_ispolnenii_smeti_tekushchikh_raskhodov_i_stoimosti_nerealizovannogo_imushchestva_kreditnoi_organizatsii'
        },
        {
          title:
            'Объявление о наличии у кредитной организации оставшегося имущества и праве ее учредителей (участников) получить указанное имущество',
          code: 'obyavlenie_o_nalichii_u_kreditnoi_organizatsii_ostavshegosya_imushchestva_i_prave_yee_uchreditelei_uchastnikov_poluchit_ukazannoe_imushchestvo'
        },
        {
          title: 'Продление срока деятельности временной администрации',
          code: 'prodlenie_sroka_deyatelnosti_vremennoi_administratsii'
        },
        {
          title:
            'Решение о передаче обязанности по выплате пожизненных негосударственных пенсий и средств пенсионных резервов другому негосударственному пенсионному фонду',
          code: 'reshenie_o_peredache_obyazannosti_po_viplate_pozhiznennikh_negosudarstvennikh_pensii_i_sredstv_pensionnikh_rezervov_drugomu_negosudarstvennomu_pensionnomu_fondu'
        },
        {
          title: 'Сообщение о начале расчетов',
          code: 'soobshchenie_o_nachale_raschetov'
        },
        {
          title: 'Сведения о ходе инвентаризации имущества должника',
          code: 'svedeniya_o_khode_inventarizatsii_imushchestva_dolzhnika'
        },
        {
          title: 'Сообщение судебного пристава',
          code: 'soobshchenie_sudebnogo_pristava'
        },
        {
          title: 'Начало исполнительного производства',
          code: 'nachalo_ispolnitelnogo_proizvodstva'
        },
        {
          title: 'Передача имущества на реализацию',
          code: 'peredacha_imushchestva_na_realizatsiyu'
        }
      ]
    }
  },
  {
    title: 'Сведения об исполнении плана реструктуризации',
    code: 'svedeniya_ob_ispolnenii_plana_restrukturizatsii',
    other_DictMessageTypes: {
      create: [
        {
          title:
            'Сведения о порядке и месте ознакомления с проектом плана реструктуризации',
          code: 'svedeniya_o_poryadke_i_meste_oznakomleniya_s_proektom_plana_restrukturizatsii'
        },
        {
          title:
            'Сведения о порядке и месте ознакомления с отчетом о результатах исполнения плана реструктуризации',
          code: 'svedeniya_o_poryadke_i_meste_oznakomleniya_s_otchetom_o_rezultatakh_ispolneniya_plana_restrukturizatsii'
        }
      ]
    }
  },
  {
    title: 'Признаки преднамеренного или фиктивного банкротства',
    code: 'priznaki_prednamerennogo_ili_fiktivnogo_bankrotstva',
    other_DictMessageTypes: {
      create: [
        {
          title:
            'Сообщение о наличии или об отсутствии признаков преднамеренного или фиктивного банкротства',
          code: 'soobshchenie_o_nalichii_ili_ob_otsutstvii_priznakov_prednamerennogo_ili_fiktivnogo_bankrotstva'
        },
        {
          title:
            'Сообщение об отмене сообщения о наличии или об отсутствии признаков преднамеренного или фиктивного банкротства',
          code: 'soobshchenie_ob_otmene_soobshcheniya_o_nalichii_ili_ob_otsutstvii_priznakov_prednamerennogo_ili_fiktivnogo_bankrotstva'
        },
        {
          title:
            'Сообщение об изменении сообщения о наличии или об отсутствии признаков преднамеренного или фиктивного банкротства',
          code: 'soobshchenie_ob_izmenenii_soobshcheniya_o_nalichii_ili_ob_otsutstvii_priznakov_prednamerennogo_ili_fiktivnogo_bankrotstva'
        }
      ]
    }
  },
  {
    title: 'Внесудебное банкротство',
    code: 'vnesudebnoe_bankrotstvo',
    other_DictMessageTypes: {
      create: [
        {
          title:
            'Сообщение о возбуждении процедуры внесудебного банкротства гражданина',
          code: 'soobshchenie_o_vozbuzhdenii_protseduri_vnesudebnogo_bankrotstva_grazhdanina'
        },
        {
          title:
            'Сообщение о прекращении процедуры внесудебного банкротства гражданина',
          code: 'soobshchenie_o_prekrashchenii_protseduri_vnesudebnogo_bankrotstva_grazhdanina'
        },
        {
          title:
            'Сообщение о завершении процедуры внесудебного банкротства гражданина',
          code: 'soobshchenie_o_zavershenii_protseduri_vnesudebnogo_bankrotstva_grazhdanina'
        },
        {
          title:
            'Сообщение о возбуждении процедуры внесудебного банкротства гражданина (проект)',
          code: 'soobshchenie_o_vozbuzhdenii_protseduri_vnesudebnogo_bankrotstva_grazhdanina_proekt'
        },
        {
          title:
            'Сообщение о возврате гражданину поданного им заявления о признании гражданина банкротом во внесудебном порядке',
          code: 'soobshchenie_o_vozvrate_grazhdaninu_podannogo_im_zayavleniya_o_priznanii_grazhdanina_bankrotom_vo_vnesudebnom_poryadke'
        }
      ]
    }
  }
];
