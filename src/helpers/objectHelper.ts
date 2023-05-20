export default {
  filter(
    obj: Record<any, any>, 
    filter: (value: any, key: string | number) => boolean
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
  deleteProperties<Type>(obj: object, keys: string[]): Type | Record<any, any> {
    return this.filter(obj, (_, key)=>!keys.includes(key as never))
  }
}