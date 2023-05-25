export default {
  filter <Obj extends object> (
    obj: Obj,
    filter: (value: any, key: keyof Obj) => boolean
  ) {
    const _obj: Record<any, any> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (filter(value, key)) {
          _obj[key] = value;
        }
      }
    }

    return { ..._obj };
  },
  deleteProperties<T extends object, U extends keyof T>(obj: T, properties: U[]): Omit<T, U> {
    const filteredObject = { ...obj };
  
    properties.forEach((key) => {
      delete filteredObject[key];
    });
  
    return filteredObject;
  }
}


// type FilteredObject<T, U> = Omit<T, U>;