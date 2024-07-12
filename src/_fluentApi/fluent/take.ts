import {
  ModuleFunctionType,
  TakeFieldType,
  TraceType,
} from "./fluent-bullet-base";
import TakeBase from "./take-base";
import WrapperTrace from "./wrapper-trace";

class Take extends TakeBase {
  protected wrapperTraceStart: WrapperTrace | null = null;
  traceStart(builder: TraceType) {
    const inst = new WrapperTrace();
    builder(inst);

    this.wrapperTraceStart = inst;

    return this;
  }

  protected wrapperTraceEnd: WrapperTrace | null = null;
  traceEnd(builder: TraceType) {
    const inst = new WrapperTrace();
    builder(inst);

    this.wrapperTraceEnd = inst;

    return this;
  }
}

export default Take;
