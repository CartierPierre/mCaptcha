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

class CopyIcon {
  copyIcon: HTMLElement;
  copyDoneIconClass: string;
  writeText: string;

  constructor(
    writeText: string,
    copyIcon: HTMLElement,
    copyDoneIconClass: string
  ) {
    this.copyIcon = copyIcon;
    this.copyDoneIconClass = copyDoneIconClass;
    this.writeText = writeText;

    this.__registerHandlers();
  }

  __registerHandlers(): void {
    this.copyIcon.addEventListener("click", (e) => this.copySitekey(e));
  }

  /*
   * Copy secret to clipboard
   */
  async copySitekey(e: Event): Promise<void> {
    const image = <HTMLElement>e.target;
    const copyDoneIcon = <HTMLElement>(
      image.parentElement.querySelector(`.${this.copyDoneIconClass}`)
    );
    await navigator.clipboard.writeText(this.writeText);
    image.style.display = "none";
    copyDoneIcon.style.display = "block";
    setTimeout(() => {
      copyDoneIcon.style.display = "none";
      image.style.display = "block";
    }, 1200);
  }
}

export default CopyIcon;
