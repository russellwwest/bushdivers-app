import { atom } from 'jotai'

export const completionState = atom({
  isAircraftSelected: false,
  isContractSelected: false,
  isDestinationSet: false
})

export const selectedAircraft = atom({})

export const selectedContracts = atom([])

export const selectedDestination = atom(null)

export const fuel = atom({})
