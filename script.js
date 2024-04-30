function closePopup(element) {
    const popup = document.getElementById("popup-container");
    popup.classList.add("popup-hidden");
}

function openPopup(element) {
    const popup = document.getElementById("popup-container");
    popup.classList.remove("popup-hidden");
}

function expandMenu(element) {
    const menu = document.getElementById("key");
    menu.classList.toggle("menu-hidden");
}

function expandOverview(element) {
    const overview = document.getElementById("overview");
    overview.classList.toggle("overview-hidden");
}

function hoverCategory(cat_id) {
    const cat_key = document.getElementById("cat-" + cat_id);
    cat_key.classList.add("cat-highlight");
}

function unhoverCategory(cat_id) {
    const cat_key = document.getElementById("cat-" + cat_id);
    cat_key.classList.remove("cat-highlight");
}

function determinePosition() {
    const header = document.getElementsByTagName("header")[0];
    const top_pos = header.offsetHeight;
    const view_height = window.innerHeight;
    let max_id = null;
    let max_val = null;
    for (let i = 1; i <= 38; i++) {
        const num_str = i.toString().padStart(2, "0");
        const event_elem = document.getElementById("event-" + num_str);
        if (event_elem == null) {
            continue;
        }
        const rect = event_elem.getBoundingClientRect();
        const rel_top = rect["top"] - top_pos;
        const rel_bottom = rect["bottom"] - top_pos;
        let screen_prop = 0
        if (rel_bottom >= 0 && rect["top"] <= view_height) {
            if (rel_top <= 0) {
                if (rect["bottom"] >= view_height) {
                    screen_prop = view_height - top_pos;
                } else {
                    screen_prop = rel_bottom;
                }
            } else {
                screen_prop = view_height - rect["top"];
            }
        }
        if ((max_id == null || screen_prop > max_val) && screen_prop != 0) {
            max_id = i;
            max_val = screen_prop;
        }
    }
    for (let i = 1; i <= 38; i++) {
        const num_str = i.toString().padStart(2, "0");
        const event_button = document.getElementById("event-button-" + num_str);
        if (event_button != null) {
            const event = document.getElementById("event-" + num_str);
            event.classList.forEach(clss => {
                if (clss.includes("hover")) {
                    let cat_id = clss[6];
                    unhoverCategory(cat_id);
                }
            });
            event_button.classList.remove("current-event-button");
        }
    }
    if (max_id != null) {
        const num_str = max_id.toString().padStart(2, "0");
        const event = document.getElementById("event-" + num_str);
        event.classList.forEach(clss => {
            if (clss.includes("hover")) {
                let cat_id = clss[6];
                hoverCategory(cat_id);
            }
        });
        curr_button = document.getElementById("event-button-" + num_str);
        curr_button.classList.add("current-event-button");
    }
}

window.addEventListener("load", determinePosition);
window.addEventListener("scroll", determinePosition);