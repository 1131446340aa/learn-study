import { RouterContext } from 'https://deno.land/x/oak@v6.0.1/mod.ts';

export type Ctx = RouterContext<Record<string | number, string | undefined>, Record<string, any>>;
