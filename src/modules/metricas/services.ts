/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IRelationship } from '@modules/relationship/dtos';
import { IUserDtos } from '@shared/dtos';
import { getWeek } from 'date-fns';

import { injectable } from 'tsyringe';
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
  CONSUMO_OUT: 'Compras',
  CONSUMO_IN: 'Vendas',
  B2B: 'B2b',
  PADRINHO: 'Padrinho',
  INDICATION: 'Indicações',
  DONATE: 'Donativos',
  INVIT: 'Ponvidados',
  PRESENCA: 'Presença',
}

const ponts = {
  B2B: 20,
  CONSUMO_OUT: 10,
  CONSUMO_IN: 10,
  PADRINHO: 35,
  PRESENCA: 10,
  INDICATION: 15,
  DONATE: 50,
  INVIT: 10,
};

interface ITrasaction {
  seg: string
  valido: number
  pending: number
  pontos: number
  currency_venda: number
  currency_compra: number
  geb: number
}

function currency(i: number) {
  return i.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

@injectable()
export class MetricService {


  async user(userId: string): Promise<IMetricUser> {

    const users = await prisma.user.findMany({ orderBy: { nome: 'asc' } }) as unknown as IUserDtos[]
    const relations = await prisma.relationShip.findMany() as unknown as IRelationship[];


    let totalPonts = 0 // feito
    let totalVendas = 0 //
    let totalCompras = 0 //
    let currencyVendas = 'R$ 0,00' //
    let currencyCompras = 'R$ 0,00' //
    let totalPresence = 0 //
    const classification: TClassification[] = []
    let satisfiedPorcentege = 0 //
    let getVendas: IRelationship[] = [] //
    let getCompras: IRelationship[] = [] //
    let totalPendente = 0

    const valorV = 0
    const valorC = 0

    const transactions: ITrasaction[] = []
    let lancamentos = 0

    sgmests.forEach((s, i) => {
      let transaction: IRelationship[] = []

      if (i === 0) {
        const get = relations!.filter(h => h.prestador_id === userId && h.type === 'CONSUMO_OUT')
        getVendas = get
        transaction = get
        lancamentos += get.length
      }

      if (i === 1) {
        const get = relations!.filter(h => h.client_id === userId && h.type === s)
        getCompras = get
        transaction = get
        lancamentos += get.length

      }

      if (i > 1) {
        const get = relations!.filter(h => h.fk_user_id === userId && h.type === s)
        transaction = get
        lancamentos += get.length
      }

      const valido = transaction.filter(p => p.situation)
      const dt = {
        seg: s,
        valido: valido.length,
        pending: transaction.filter(p => !p.situation).length,
        pontos: valido.length * ponts[s],
        currency_venda: i === 0 ? valido.reduce((ac, item) => ac + item.objto.valor || 0, 0) / 100 : 0,
        currency_compra: i === 1 ? valido.reduce((ac, item) => ac + item.objto.valor || 0, 0) / 100 : 0,
        geb: i === 1 ? valido.filter(p => p.prestador_id === 'AlTHCu2ULagv43whGZTLYyY8Fro2').reduce((ac, item) => ac + item.objto.valor, 0) : 0

      }

      transactions.push(dt)
    })

    totalCompras = transactions.reduce((ac, i) => ac + i.currency_compra, 0)
    totalVendas = transactions.reduce((ac, i) => ac + i.currency_venda, 0)
    totalPonts = transactions.reduce((ac, i) => ac + i.pontos, 0)
    currencyCompras = currency(totalCompras)
    currencyVendas = currency(totalVendas)
    totalPresence = transactions.filter(h => h.seg === 'PRESENCA').reduce((ac, i) => ac + i.valido, 0)
    totalPendente = transactions.reduce((ac, i) => ac + i.pending, 0)

    // totalPonts = presenca + indication + venda + compra + b2b + padrinho + convidado + donates
    const amountGeb = transactions.reduce((acc, item) => acc + item.geb, 0) / 100
    satisfiedPorcentege = Number((totalCompras / amountGeb * 100).toFixed(0))

    sgmests.forEach((s, index) => {
      const mapin = users!.map(user => {

        const v = relations!.filter(p => {

          if (index === 0) {
            return p.prestador_id === user.id && p.situation && p.type === 'CONSUMO_OUT'
          }

          if (index === 1) {
            return p.client_id === user.id && p.situation && p.type === 'CONSUMO_OUT'
          }

          if (index > 1) {
            return p.situation && p.type === s && p.fk_user_id === user.id
          }

        })

        const sg = index === 0 ? 'CONSUMO_OUT' : s

        const pontos = v.length * ponts[sg]

        return {
          ponto: pontos,
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

    // totalPonts = classification.map(h => {
    //   return h.ponts
    // }).reduce((ac, i) => ac + i, 0)

    const currencyWeek = getWeek(new Date()) - 1;
    const satisfiedPresence = Number((totalPresence / currencyWeek * 100).toFixed(0)) || 0


    const handshak = relations
      .filter(h => !h.situation && h.type !== 'INVIT' && h.type !== 'PRESENCA' && h.type !== 'DONATE' && h.prestador_id === userId).length

    return {
      totalPonts,
      totalPendente,
      totalVendas: transactions.reduce((ac, i) => ac + i.valido, 0),
      totalCompras,
      currencyCompras,
      currencyVendas,
      satisfiedPorcentege,
      totalPresence,
      satisfiedPresence,
      IdealPresence: currencyWeek,
      handshak,
      classification,
      getCompras,
      getVendas,
    };
  }

  async global(): Promise<any> {


    const relations = await prisma.relationShip.findMany() as unknown as IRelationship[];

    const consumoTotal = relations.filter(h => h.type === 'CONSUMO_OUT' && h.situation)
      .reduce((ac, i) => ac + i.objto.valor, 111075052)


    const total = (consumoTotal + 1063581620)
    return { consumoTotal: currency(total / 100) }
  }
}
