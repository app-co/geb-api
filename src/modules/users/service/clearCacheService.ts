import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export class clearCacheService {
   constructor(
      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<void> {
      await this.cache.invalidate('users');
      await this.cache.invalidatePrefix(`individualPonts`);
      await this.cache.invalidate('post');

      await this.cache.invalidate('profile');

      await this.cache.invalidatePrefix(`individualPonts`);
      await this.cache.invalidate('padrinho');

      await this.cache.invalidate(`indication`);
      await this.cache.invalidatePrefix(`indication-indicado`);
      await this.cache.invalidatePrefix('indiQuem');
      await this.cache.invalidatePrefix('individualPonts');

      await this.cache.invalidate('orderTransaction');
      await this.cache.invalidatePrefix(`order-transaction-consumidor`);
      await this.cache.invalidatePrefix('order-transaction-prestador');

      await this.cache.invalidate('b2b');
      await this.cache.invalidatePrefix('b2bSend');
      await this.cache.invalidatePrefix('b2bReci');
      await this.cache.invalidatePrefix('individualPonts');
   }
}
