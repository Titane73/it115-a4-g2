const ta_data = {
    SpaceNeedle: {
        Name: "Space Needle",
        Address: "400 Broad St, Seattle, WA 98109",
        Hours: ["Monday - Wednesday: 11:00AM - 6:00PM", "Thursday - Sunday: 11:00AM - 9:00PM"],
        Price: ["Regular: $32.50 to $37.50", "Senior (ages 65+): $27.50 to $32.50", "Youth (ages 5-12): $24.50 to $28.50"],
        Introduction: "The Space Needle is an observation tower in Seattle, Washington, United States. Considered to be an icon of the city and the Pacific Northwest, it has been designated a Seattle landmark. Located in the Lower Queen Anne neighborhood, it was built in the Seattle Center for the 1962 World's Fair, which drew over 2.3 million visitors. Nearly 20,000 people a day used its elevators during the event.",
        Resources: [{
            href: "https://en.wikipedia.org/wiki/Space_Needle",
            text: "Space Needle On Wikipedia"
        }, {
            href: "https://www.spaceneedle.com/",
            text: "Space Needle Official Website"
        }]
    },
    MountRainier: {
        Name: "Mount Rainier National Park",
        Address: "Mount Rainier National Park",
        Hours: ["Open All Year", "Visitation is at its peak in July and August"],
        Price: ["Mount Rainier Annual Pass : $55",
            "Mount Rainier Single Vehicle Fee : $30",
            "Mount Rainier \"Per Person\" Fee : $15"
        ],
        Resources: [{
            href: "https://en.wikipedia.org/wiki/Mount_Rainier_National_Park",
            text: "Mount Rainier National Park On Wikipedia"
        }, {
            href: "https://www.nps.gov/mora/index.htm",
            text: "U.S. National Park Service"
        }],
        Introduction: "Mount Rainier National Park is an American national park located in southeast Pierce County and northeast Lewis County in Washington state. The park was established on March 2, 1899 as the fifth national park in the United States, preserving 236,381 acres (369.3 sq mi; 956.6 km2) including all of Mount Rainier, a 14,411-foot (4,392 m) stratovolcano. The mountain rises abruptly from the surrounding land with elevations in the park ranging from 1,600 feet to over 14,000 feet (490–4,300 m). "
    },
    SeattleGreatWheel: {
        Name: "Seattle Great Wheel",
        Address: "1301 Alaskan Way, Seattle, WA 98101",
        Hours: ["Friday & Saturday 11am-10pm", "Friday & Saturday 11am-10pm"],
        Price: ["Babies(0-2) : Free",
            "Youth(3-11) : $10",
            "Adults(12+) : $15",
            "Seniors(65+) : $13",
        ],
        Resources: [{
            href: "https://en.wikipedia.org/wiki/Seattle_Great_Wheel",
            text: "Seattle Great Wheel On Wikipedia"
        }, {
            href: "https://seattlegreatwheel.com/",
            text: "Space Great Wheel Official Website"
        }],
        Introduction: "Seattle was the third city in North America to offer a wheel of this design, following the Niagara SkyWheel at Clifton Hill, Niagara Falls, Canada (which is also 175 feet (53.3 m) tall), and the larger Myrtle Beach SkyWheel in South Carolina, which stands 187 feet (57.0 m) tall. The Seattle wheel is the only one of the three to be built over water."
    },
    glass: {
        Name: "Chihuly Garden and Glass",
        Address: "305 Harrison St, Seattle, WA 98109",
        Hours: ["Open every day from 11:00AM - 5:00PM"],
        Price: ["Youth(5-12) : $19",
            "Regular(13-64) : $32",
            "Senior(65+) : $27",
            "WA State Adult : $27"
        ],
        Resources: [{
            href: "https://en.wikipedia.org/wiki/Chihuly_Garden_and_Glass",
            text: "Chihuly Garden and Glass On Wikipedia"
        }, {
            href: "https://www.chihulygardenandglass.com/",
            text: "Chihuly Garden and Glass Official Website"
        }],
        Introduction: "The project features three primary components: the Garden, the Glasshouse, and the Interior Exhibits, with significant secondary spaces including a 90-seat café with additional outdoor dining, a 50-seat multi-use theater and lecture space, retail and lobby spaces, and extensive public site enhancements beyond the Garden. The 100-foot-long installation inside of the Glasshouse is one of Chihuly's largest suspended sculptures. Designed with the help of architect Owen Richards, the facility was awarded LEED silver certification from the USGBC."
    }
}

class tourisAttractions {
    constructor() {
        this.detailWrapper = document.getElementById("ta-detail")
        this.ListWrapper = document.getElementById("ta-taList");

        this.gallery = document.getElementById("ta-gallery").getElementsByTagName("img");
        this.picMaster = document.getElementById("ta-pic-master");
        this.BtnClose = document.getElementById("ta-detail-btnClose");
        this.BtnsMore = document.getElementsByClassName("ta-btnMore");

        this.detailName = document.getElementById("ta-detail-name");
        this.detailIntroduction = document.getElementById("ta-detail-Introduction");
        this.detailAddress = document.getElementById("ta-detail-address");

        this.ulResources = document.getElementById("ta-detail-resources");
        this.ulPrice = document.getElementById("ta-detail-price");
        this.ulHours = document.getElementById("ta-detail-hours");

        this.initEvent();
    }
    initEvent() {
        for (let ele of this.gallery) {
            ele.addEventListener("mouseenter", (e) => {
                window.ta.alterPicMaster(e.target);
            })
        };



        this.BtnClose.addEventListener("click", () => {
            window.ta.close();
        });

        for (let ele of this.BtnsMore) {
            ele.addEventListener("click", (e) => {
                window.ta.showIntroduction(e.target);
            });
        }
    }

    alterPicMaster(target) {
        this.picMaster.src = target.src;
    }
    showIntroduction(target) {
        var spot = target.getAttribute("spot")
        var Info = ta_data[spot];

        var index = 1;
        for (let ele of this.gallery) {
            ele.src = `/img/${spot}-${index}.jpg`;
            index++;
        };

        this.picMaster.src = `/img/${spot}-1.jpg`;
        this.detailName.innerText = Info["Name"];
        this.detailIntroduction.innerText = Info["Introduction"];
        this.detailAddress.innerText = Info["Address"];

        this.generateLi(this.ulHours, Info["Hours"], false);
        this.generateLi(this.ulPrice, Info["Price"], false);
        this.generateLi(this.ulResources, Info["Resources"], true);

        this.detailWrapper.classList.add("ta-detail-show");
        this.ListWrapper.classList.add("ta-taList-hide");

    }
    close() {
        console.log("close");
        this.ListWrapper.classList.remove("ta-taList-hide");
        this.detailWrapper.classList.remove("ta-detail-show");
    }
    generateLi(obj, data, isLink) {
        var lisObj = ''

        data.forEach(e => {
            if (isLink) {
                lisObj += `<li><a target="_blank" href="${e.href}">${e.text}</a></li>`;
                return;
            }
            lisObj += `<li>${e}</li>`;
        });
        obj.innerHTML = lisObj;
    }
}