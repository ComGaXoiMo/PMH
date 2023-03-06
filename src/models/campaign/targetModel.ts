import {RowData} from "@models/DataTable"

export interface IRowTarget {
}

export class RowTargetModel extends RowData implements IRowTarget{

  constructor() {
    super()
  }

  public static assign(obj) {
    if (!obj) return undefined

    let newObj = Object.assign(new RowTargetModel(), obj)

    return newObj
  }

  public static assigns<T>(objs) {
    let results: any[] = [];
    (objs || []).forEach((item) => results.push(this.assign(item)))
    return results
  }
}
