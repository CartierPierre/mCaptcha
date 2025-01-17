/*
 * Copyright (C) 2022  Aravinth Manivannan <realaravinth@batsense.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import * as Add from "../add/advance/ts/form/";
import addLevelButtonAddEventListener from "../add/advance/ts/addLevelButton";
import { addRemoveLevelButtonEventListenerAll } from "../add/advance/ts/removeLevelButton";
import getNumLevels from "../add/advance/ts/levels/getNumLevels";
import validateLevel from "../add/advance/ts/levels/validateLevel";
import * as UpdateLevel from "../add/advance/ts/levels/updateLevel";
import validateDescription from "../add/advance/ts/form/validateDescription";
import validateDuration from "../add/advance/ts/form/validateDuration";
import { LEVELS } from "../add/advance/ts/levels";

import getFormUrl from "../../../utils/getFormUrl";
import genJsonPayload from "../../../utils/genJsonPayload";
import createError from "../../../components/error";
import LazyElement from "../../../utils/lazyElement";

import VIEWS from "../../../views/v1/routes";

const BTN_ID = "sitekey-form__submit";
const BTN = new LazyElement(BTN_ID);

const submit = async (e: Event) => {
  e.preventDefault();

  const description = validateDescription(e);
  const duration = validateDuration();

  const formUrl = getFormUrl(Add.FORM);

  const levels = LEVELS.getLevels();
  console.debug(`[form submition]: levels: ${levels}`);

  const key = BTN.get().dataset.sitekey;

  const payload = {
    levels,
    duration,
    description,
    key,
  };

  console.debug(`[form submition] json payload: ${JSON.stringify(payload)}`);

  const res = await fetch(formUrl, genJsonPayload(payload));
  if (res.ok) {
    window.location.assign(VIEWS.viewSitekey(key));
  } else {
    const err = await res.json();
    createError(err.error);
  }
};

const addSubmitEventListener = () => {
  Add.FORM.addEventListener("submit", submit, true);
};

const bootstrapLevels = () => {
  const levels = getNumLevels();
  addRemoveLevelButtonEventListenerAll();
  for (let i = 1; i <= levels - 1; i++) {
    validateLevel(i);
    UpdateLevel.register(i);
  }
};

export const index = (): void => {
  addSubmitEventListener();
  addLevelButtonAddEventListener();
  bootstrapLevels();
};
