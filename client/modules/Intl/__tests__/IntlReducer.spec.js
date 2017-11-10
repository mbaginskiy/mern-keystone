import intlReducer from '../IntlReducer';
import { SWITCH_LANGUAGE } from '../IntlActions';
import { localizationData, enabledLanguages } from '../../../../Intl/setup';

test('action for SWITCH_LANGUAGE is working', () => {
  expect(intlReducer({
    locale: 'en',
    enabledLanguages,
    ...localizationData.en,
  }, {
    type: SWITCH_LANGUAGE,
    ...localizationData.fr,
  }))
    .toEqual({
      locale: 'fr',
      enabledLanguages,
      ...localizationData.fr,
    });
});
