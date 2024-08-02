export function jsx(html, ...args) {
    return html.slice(1).reduce((str, elem, i) => str + args[i] + elem, html[0]);
}

export async function loadConfig(path) {
    const resp = await fetch(path);
    return await resp.json();
}

export default async function decorate(block) {
    const pathElement = block.querySelector('a');

    if(pathElement) {
        const path = pathElement.textContent;

        const jsonConfig  = await loadConfig(path);

        var finalHTML = '';

        jsonConfig.data.map(function(item){
            var DMLink = 'https://s7ap1.scene7.com/is/image/varuncloudready/LunchClub?';

            for (const property in item) {
                DMLink += `&${property}=${encodeURIComponent(item[property])}`;
            }

            finalHTML += jsx`
                <picture>
                    <source type="image/webp" srcset="${DMLink}">
                    <img class="s7" loading="lazy" alt="..." src="${DMLink}">
                </picture>
                <p>${DMLink}</p>
                <br />
                <br />
            `;
            console.log(item);
        })

        block.innerHTML = finalHTML;

        /*
        block.innerHTML = jsx`
            <picture>
            <source type="image/webp" srcset="${link}?$rfk_medium$">
            <img class="s7" loading="lazy" alt="..." src="${link}?$rfk_medium$">
            </picture>
        `;
        */
    }
  }
  