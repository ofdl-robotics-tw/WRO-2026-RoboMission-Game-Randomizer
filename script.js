
var maps = Array.from(document.getElementsByClassName("map"));

function shuffle(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

function clearClasses(divs, colorList) {
    divs.forEach(div => {
        colorList.forEach(c => div.classList.remove(c));
    });
}

function assignColors(containerId, colors, emptyCount) {
    const divs = Array.from(document.querySelectorAll(`#${containerId} > div`));
    clearClasses(divs, colors);

    const total = divs.length;
    const colorCount = total - emptyCount;

    const selected = shuffle(colors).slice(0, colorCount);

    const tags = selected.concat(Array(emptyCount).fill(null));

    const shuffledTags = shuffle(tags);

    divs.forEach((div, idx) => {
        const tag = shuffledTags[idx];
        if (tag) {
            div.classList.add(tag);
        }
    });
}

function random() {
    // map_elementary：4 個 div，4 色 + 0 空
    assignColors('map_elementary',
        ['black', 'white', 'yellow', 'blue'],
        0);

    // map_junior：4 個 div，5 色 + 0 空
    assignColors('map_junior',
        ['blue', 'red', 'green', 'black', 'yellow'],
        0);
    // map_senior：12 個 div，4*6 色 + 0 空
    assignColors('map_senior',
        [...Array(6).fill('yellow'),
        ...Array(6).fill('blue'),
        ...Array(6).fill('green'),
        ...Array(6).fill('white')
        ],
        0);
}

function screenshot() {
    htmlToImage.toJpeg(Array.from(document.getElementsByClassName("map")).find(ele => ele.classList.contains("select")), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'Map.jpeg';
            link.href = dataUrl;
            link.click();
        });

}

function changeCategory(value) {
    maps.forEach((map, index) => {
        (index == parseInt(value)) ? map.classList.add("select") : map.classList.remove("select");
    })
}

random()