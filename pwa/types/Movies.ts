import { Item } from "./item";

export class Movies implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public title?: string,
    public rentalRate?: number,
    public rating?: string,
    public category?: string,
    public rental?: number
  ) {
    this["@id"] = _id;
  }
}
