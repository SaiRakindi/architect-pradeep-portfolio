/**
 * Lightweight SplitText utility (no GSAP SplitText plugin required)
 * Splits text into lines, words, and chars for animation
 */
export class SplitText {
  element: HTMLElement;
  lines: HTMLElement[];
  words: HTMLElement[];
  chars: HTMLElement[];

  constructor(element: HTMLElement) {
    this.element = element;
    this.lines = [];
    this.words = [];
    this.chars = [];
    this.split();
  }

  private split() {
    const text = this.element.innerText;
    const rawLines = text.split("\n");

    this.element.innerHTML = "";
    this.element.style.overflow = "hidden";

    rawLines.forEach((lineText, li) => {
      const lineWrapper = document.createElement("div");
      lineWrapper.style.overflow = "hidden";
      lineWrapper.style.display = "block";

      const line = document.createElement("div");
      line.style.display = "block";
      line.style.willChange = "transform, opacity";

      const wordsInLine = lineText.split(" ");
      wordsInLine.forEach((wordText, wi) => {
        const word = document.createElement("span");
        word.style.display = "inline-block";
        word.style.whiteSpace = "pre";
        word.textContent = wi < wordsInLine.length - 1 ? wordText + " " : wordText;
        line.appendChild(word);
        this.words.push(word);

        // Chars
        [...wordText].forEach((char) => {
          const c = document.createElement("span");
          c.style.display = "inline-block";
          c.textContent = char;
          this.chars.push(c);
        });
      });

      lineWrapper.appendChild(line);
      this.element.appendChild(lineWrapper);
      this.lines.push(line);

      if (li < rawLines.length - 1) {
        this.element.appendChild(document.createTextNode("\n"));
      }
    });
  }

  revert() {
    // Restore original content
    const texts = this.lines.map((l) => l.textContent).join("\n");
    this.element.innerHTML = "";
    this.element.style.overflow = "";
    this.element.textContent = texts;
  }
}
