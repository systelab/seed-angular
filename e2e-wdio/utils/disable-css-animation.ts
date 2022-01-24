
export class CSSAnimationUtility {

    public static async disable(): Promise<void> {
        await browser.execute(()=> {
            var css = '* {' + 'animation: none !important;' + '}';
            var head = document.head || document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            head.appendChild(style);
        });
    }
}
