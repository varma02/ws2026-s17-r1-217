import { useEffect, useState } from "react"
import { GRID_SIZE_X, GRID_SIZE_Y } from "./constant"

export type GeneralInfo = {
  name: string,
  description: string,
  postalCode: number,
  city: string,
  address: string,
  from: string,
  to: string,
  openAt: string,
}

export type Extras = {
  freeWiFi: boolean,
  accessibleEntry: boolean,
  loungeArea: boolean,
  backgroundMusic: true,
  customerService: false,
  parking: string,
}

export function validateGeneralInfo(d: GeneralInfo): string[] {
  const invalid: string[] = []
  if (!d.name?.match(/^.{3,32}$/g)) invalid.push("name")
  if (!d.description?.match(/^.{10,256}$/g)) invalid.push("description")
  if (!d.postalCode?.toString().match(/^\d{4}$/g)) invalid.push("postalCode")
  if (!d.city?.match(/^.{3,32}$/g)) invalid.push("city")
  if (!d.address?.match(/^.{5,128}$/g)) invalid.push("address")
  if (!d.openAt?.match(/^((Every Day)|(Weekdays)|(Weekends)){1}$/g)) invalid.push("openAt")
  if (!d.from?.match(/^\d{2}:\d{2}$/g)) invalid.push("from")
  if (!d.to?.match(/^\d{2}:\d{2}$/g)) invalid.push("to")
  return invalid
}

export function validateFloorplan(d: string[][]): boolean {
  return (
    d.length == GRID_SIZE_X && d.every((v) => v.length == GRID_SIZE_Y) &&
    d.every((yv, yi) => yv.every((xv, xi) => (
      xv.includes("Washer") || xv.includes("Dryer") ? (
        (yi == 0 || yi == 5) ||
        (xi == 0 || xi == 4) ||
        (d[yi][xi-1] == "Wall") ||
        (d[yi][xi+1] == "Wall") ||
        (d[yi-1][xi] == "Wall") ||
        (d[yi+1][xi] == "Wall")
      ) : true
    )))
  )
}

export function usePersistedState<T>(key: string, defaultValue: any): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(
    JSON.parse(sessionStorage.getItem(key) as any) || defaultValue
  );
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}