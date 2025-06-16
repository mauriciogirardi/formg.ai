'use client'

import CountUp from 'react-countup'

type Stats = {
  amount?: number
  percent?: boolean
}

export function Stats({ amount = 0, percent = false }: Stats) {
  return <CountUp end={amount} suffix={percent ? '%' : undefined} />
}
