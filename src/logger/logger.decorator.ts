export function Log(): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    try {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        console.log(`Calling ${String(propertyKey)} with args`, args);
        const result = originalMethod.apply(this, args);
        if (result instanceof Promise) {
          console.log(`The method ${String(propertyKey)} is asynchronous`);
          return result
            .then((res: any) => {
              console.log(`Called ${String(propertyKey)} returned`, res);
              return res;
            })
            .catch((error: any) => {
              console.error(
                `Called ${String(propertyKey)} threw an error`,
                error,
              );
              throw error;
            });
        } else {
          console.log(`The method ${String(propertyKey)} is synchronous`);
          console.log(`Called ${String(propertyKey)} returned`, result);
          return result;
        }
      };
    } catch (error) {
      console.error(
        `Execution of ${String(propertyKey)} threw an error`,
        error,
      );
      throw error;
    }
    return descriptor;
  };
}
