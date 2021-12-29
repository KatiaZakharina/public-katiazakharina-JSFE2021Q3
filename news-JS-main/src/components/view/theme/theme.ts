import './theme.css';
import { Theme, ThemeStrings } from '../../constants';
import { IThemeController } from '../../classes';

export class ThemeController implements IThemeController {
    private theme: Theme;
    private switcherEl: HTMLElement;
    private themeElements: NodeListOf<Element>;
    private stars: NodeListOf<Element>;
    public animationID: number | null;

    constructor() {
        this.theme = Theme.NIGHT;
        this.switcherEl = document.querySelector('.theme-switcher')!;
        this.themeElements = this.switcherEl.querySelectorAll('.theme-icon')!;

        this.switcherEl.addEventListener('click', (e: Event) => {
            (document.querySelector('.rs-logo')! as HTMLElement).style.filter = 'invert(1)';
            this.handleThemeChange(e);
        });
    }
    handleThemeChange(e: Event): void {
        if ((e.target as Element).tagName === 'LI') {
            this.themeElements.forEach((el) => {
                el.classList.remove('theme-icon_active');
            });

            (e.target as HTMLElement).classList.add('theme-icon_active');
            const themeName: string = (e.target as HTMLElement).dataset.theme!.toUpperCase();
            this.theme = Theme[themeName as ThemeStrings];

            switch (this.theme) {
                case Theme.NIGHT:
                    this.night(true);
                    break;
                case Theme.LIGHT:
                    this.light(true);
                    break;
                case Theme.SNOW:
                    this.snow();
                    break;
            }
        }
    }
    night(needClear: boolean = false): void {
        (document.querySelector('.rs-logo')! as HTMLElement).style.filter = 'invert(0)';

        if (needClear && this.animationID) this.clearSnow();

        const night = {
            'bg-color': '#17181c',
            'contrast-color': '#fff',
            accent: '#30c5ff',
            'accent-alfa': '#30c5ff66',
            'accent-light': '#70d6ff',
            'accent-hover': '#3fcc59',
            'accent-light-hover': '#69db7e',
            'accent-text:': '#5ad67d',
        };
        Object.entries(night).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    }

    light(needClear: boolean): void {
        if (needClear && this.animationID) this.clearSnow();

        (document.querySelector('.rs-logo')! as HTMLElement).style.filter = 'invert(1)';

        const light = {
            'bg-color': '#f2ece6',
            'contrast-color': '#2e2a2a',
            accent: '#e0847d',
            'accent-alfa': '#e0847d66',
            'accent-light': '#df9893',
            'accent-hover': '#73bf7b',
            'accent-light-hover': '#a4d191',
            'accent-text:': '#73bf7b',
        };
        Object.entries(light).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    }

    snow(): void {
        if (this.animationID) this.clearSnow();
        this.night();

        document.body.style.backgroundImage = 'url("./assets/bg.jpg")';

        function drawParticle(): void {
            let starDensity: number;

            if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
                starDensity = 20;
            } else {
                starDensity = 2;
            }

            let snow: Array<string> = Array(Math.ceil(Math.random() * 4) + starDensity);

            let getSnowType: () => 'star' | 'snowflake' = () => {
                return Math.floor(Math.random() * 2) ? 'star' : 'snowflake';
            };

            snow.fill(
                `<img class="particle" data-speed='${
                    Math.floor(Math.random() * 5) + 2
                }' src="./assets/${getSnowType()}.svg" alt="star">`
            );

            let snowWrapper: HTMLElement;
            if (!document.querySelector('.snow-wrapper')) {
                snowWrapper = document.createElement('div');
                snowWrapper.classList.add('snow-wrapper');
                document.body.append(snowWrapper);
            } else {
                snowWrapper = document.querySelector('.snow-wrapper')!;
            }

            snow.forEach((particle) => {
                snowWrapper.innerHTML += particle;
            });

            this.stars = document.querySelectorAll('.particle');
            let starWay: number;
            if (document.documentElement.scrollHeight > document.documentElement.clientWidth) {
                starWay = document.documentElement.scrollHeight - 500;
            } else {
                starWay = document.documentElement.scrollHeight - 50;
            }
            this.stars.forEach((star: HTMLElement) => {
                star.style.top = ~~(Math.random() * starWay) + 'px';
                star.style.right = ~~(Math.random() * document.documentElement.clientWidth) + 'px';
            });
        }

        drawParticle.call(this);

        function showFall(): void {
            this.stars.forEach((star: HTMLElement) => {
                const speed: number = +star.getAttribute('data-speed')!;
                star.style.top = ((star.offsetTop + speed / 3) % (document.documentElement.scrollHeight - 50)) + 'px';
            });
            this.animationID = window.requestAnimationFrame(showFall.bind(this));
        }
        this.animationID = window.requestAnimationFrame(showFall.bind(this));
    }
    clearSnow() {
        document.body.style.backgroundImage = '';
        this.stars.forEach((star) => star.remove());
        if (this.animationID) {
            window.cancelAnimationFrame(this.animationID);
        }
        this.animationID = null;
    }
}
