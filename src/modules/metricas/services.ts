/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IRelationship } from '@modules/relationship/dtos';
import { IUserDtos } from '@shared/dtos';
import { getWeek } from 'date-fns';

import { prisma } from '../../utils/prisma';
import { IMetricUser, TClassification } from './dtos';

const sgmests = [
  'CONSUMO_IN'
  , 'CONSUMO_OUT'
  , 'B2B'
  , 'PADRINHO'
  , 'INDICATION'
  , 'DONATE'
  , 'INVIT'
  , 'PRESENCA']

const translateSeg = {
  CONSUMO_IN: 'COMPRAS',
  CONSUMO_OUT: 'VENDAS',
  B2B: 'B2B',
  PADRINHO: 'PADRINHO',
  INDICATION: 'INICAÇÕES',
  DONATE: 'DONATIVOS',
  INVIT: 'CONVIDADOS',
  PRESENCA: 'PRESENÇA',
}

function currency(i: number) {
  return i.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export class MetricService {

  async user(userId: string): Promise<IMetricUser> {
    const users = await prisma.user.findMany({ orderBy: { nome: 'asc' } }) as unknown as IUserDtos[]
    const relations = await prisma.relationShip.findMany() as unknown as IRelationship[];

    let totalPonts = 0 // feito
    let totalVendas = 0 //
    let totalCompras = 0 //
    let totalPresence = 0 //
    const classification: TClassification[] = []
    let satisfiedPorcentege = 0 //
    const getVendas: IRelationship[] = [] //
    const getCompras: IRelationship[] = [] //
    let currencyVendas = 'R$ 0,00' //
    let currencyCompras = '' //
    let totalPendente = 0

    let valorV = 0
    let valorC = 0

    sgmests.forEach((s, i) => {
      let pontos = 0
      let pending = 0
      const presence = 0

      relations!.forEach(h => {

        if (i === 0) {
          if (h.prestador_id === userId && h.situation && h.type === 'CONSUMO_OUT') {
            totalVendas += 1
            valorV += h.objto.valor
            currencyVendas = currency(valorV / 100 ?? 0)
            getVendas.push(h)
            pontos += h.ponts
          }
        }

        if (i === 1) {

          if (h.client_id === userId && h.situation && h.type === 'CONSUMO_OUT') {
            totalCompras += 1
            valorC += h.objto.valor
            currencyCompras = currency(valorC / 100)
            getCompras.push(h)
            pontos += h.ponts
          }
        }

        if (i > 1) {
          if (h.fk_user_id === userId && h.situation && h.type === s) {
            totalPresence = s === 'PRESENCA' ? + totalPresence + 1 : 0
            pontos += h.ponts
          }
        }



        if (h.fk_user_id === userId && !h.situation) {
          pending += 1
        }
      })

      totalPonts += totalPonts + pontos
      totalPendente += totalPendente + pending

    })

    // totalPonts = presenca + indication + venda + compra + b2b + padrinho + convidado + donates

    satisfiedPorcentege = Number((valorV / 1500 * 100).toFixed(0))

    sgmests.forEach((s, index) => {
      const mapin = users!.map(user => {

        const v = relations!.filter(p => {

          if (index === 0) {
            return p.prestador_id === user.id && p.situation && p.type === 'CONSUMO_OUT'
          }

          if (index === 1) {
            return p.client_id === user.id && p.situation && p.type === s
          }

          if (index > 1) {
            return p.situation && p.type === s && p.fk_user_id === user.id
          }

        })
          .reduce((acc, i) => acc + i.ponts, 0)

        return {
          ponto: v,
          segmento: s,
          id: user.id
        }
      }).sort((a, b) => {
        return b.ponto - a.ponto;
      }).map((h, i) => {
        return {
          id: h.id,
          ponts: h.ponto,
          rank: i + 1,
          segment: translateSeg[h.segmento]
        }
      }).find(h => h.id === userId)

      classification.push(mapin)

    })

    const currencyWeek = getWeek(new Date());
    const satisfiedPresence = Number((totalPresence / currencyWeek * 100).toFixed(0))

    const handshak = relations
      .filter(h => !h.situation && h.type !== 'INVIT' && h.type !== 'PRESENCA' && h.type !== 'DONATE' && h.prestador_id === userId).length

    return {
      totalPendente,
      totalVendas, satisfiedPresence, IdealPresence: currencyWeek,
      currencyVendas, handshak,
      classification,
      currencyCompras,
      getCompras,
      getVendas,
      satisfiedPorcentege,
      totalCompras,
      totalPresence,
      totalPonts,
    };
  }

  async global(): Promise<any> {
    const relations = await prisma.relationShip.findMany() as unknown as IRelationship[];

    const consumoTotal = relations.filter(h => h.type === 'CONSUMO_OUT' && h.situation).reduce((ac, i) => ac + i.objto.valor, 0)

    const ac = (128841293700 - consumoTotal)
    console.log(ac)
    // 1058153178
    return { consumoTotal: currency((consumoTotal + 111075052 / 100)) }
  }
}
