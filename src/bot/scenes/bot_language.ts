import { Action, Ctx, Scene } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotButtons } from '../bot.buttons';
import { I18nTranslateService } from '../../i18n/i18n.service';

@Scene('lang')
export class BotLanguage {
  constructor(private i18n: I18nTranslateService) {
    this.i18n = i18n;
  }
  @Action(['ru', 'en'])
  async getLanguage(@Ctx() ctx: Context) {
    console.log(ctx.callbackQuery['data']);
    await ctx.deleteMessage();
    ctx['session']['language'] = ctx.callbackQuery['data'];
    const language = ctx['session']['language'];
    await ctx.reply(
      await this.i18n.getChooseCommands(language),
      BotButtons.startupButtons(await this.i18n.startupButtons(language)),
    );
    await ctx['scene'].leave();
  }
}
