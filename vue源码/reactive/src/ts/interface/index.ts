import { _Function } from '../type';
export interface Effect {
  id?: number,
  options?: EffectOptions,
  deps?: Set<Effect>[]
  (): _Function
}

export interface DefineProperty {
  get: _Function
  set: <T extends object>(value?: T) => any
}
export interface EffectOptions {
  computed?: boolean
  lazy?: boolean
  scheduler?(): void

}