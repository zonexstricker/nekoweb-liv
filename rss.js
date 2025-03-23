function loadXMLFile(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            callback(xmlDoc);
        })
        .catch(error => console.error('Error loading XML file:', error));
}

function convertRSSToHTML(xmlDoc) {
    const channel = xmlDoc.querySelector("channel");
    const items = channel.querySelectorAll("item");

    let html = '';

    const channelTitle = channel.querySelector("title").textContent;
    const channelLink = channel.querySelector("link").textContent;
    const channelDescription = channel.querySelector("description").textContent;

    /*html += `<div class="channel">
                <h1><a href="${channelLink}">${channelTitle}</a></h1>
                <p>${channelDescription}</p>
             </div>`;
             */ //Channel information is not needed since it's only going to show this sites rss feed 

    items.forEach(item => {
        const itemTitle = item.querySelector("title").textContent;
        const itemLink = item.querySelector("link").textContent;
        const itemDescription = item.querySelector("description").textContent;
        const itemCategory = item.querySelector("category")?.textContent || "Uncategorized";

        html += `<div class="item">
                    <h2><a href="${itemLink}">${itemTitle}</a></h2>
                    <p><strong>Category:</strong> ${itemCategory}</p>
                    <p>${itemDescription}</p>
                 </div>`;
    });

    return html;
}

function displayHTML(html) {
    const container = document.getElementById('Blog');
        html += `<div style="display: flex; justify-content: center;"><a href=/xml/rss.xml ><img src="/images/pic_rss.gif"></a></div>`
    container.innerHTML = html;
}

loadXMLFile('xml/rss.xml', function(xmlDoc) {
    const html = convertRSSToHTML(xmlDoc);
    displayHTML(html);
});