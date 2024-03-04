import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export class clearCacheService {
   constructor(
      @inject('Cache')
      private cache: ICacheProvider,
   ) { }

   async execute(): Promise<void> {
      await this.cache.removeAll();
   }
}
