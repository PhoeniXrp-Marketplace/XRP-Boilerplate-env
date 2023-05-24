import xrplLogo from '..xrp/src/logo.svg';

export default function renderXrplLogo() {
    document.getElementById('heading_logo').innerHTML = `
<a
    href="https://xrpl.org/"
    target="_blank"
    class="logo_link"
>
    <img id="xrpl_logo" class="logo vanilla" alt="XRPL logo" src="${xrplLogo}" />
</a>
`;
}