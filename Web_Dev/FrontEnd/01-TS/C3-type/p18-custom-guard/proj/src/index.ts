{
  function isString(input: any): input is string {
    return typeof input === "string";
  }

  function isNumber(input: any): input is number {
    return typeof input === "number";
  }

  function foo(input: string | number) {
    if (isString(input)) {
      console.log(input); // input type: string
    } else {
      console.log(input); // input type: number
    }
  }
}

{
  type Box = {
    _v_isBox: boolean;
    value: any;
  };

  function isBox(box: any): box is Box {
    return box && box._v_isBox === true;
  }

  function unWrapBox(box: Box) {
    return isBox(box) ? box.value : box;
  }
}
