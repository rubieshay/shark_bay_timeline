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

// function hoverCategory(cat_ids) {
//     cat_ids.forEach(id => {
//         const cat_key = document.getElementById("cat-" + id);
//         cat_key.classList.add("cat-highlight-single");
//     });
// }

// function unhoverCategory(cat_ids) {
//     cat_ids.forEach(id => {
//         const cat_key = document.getElementById("cat-" + id);
//         cat_key.classList.remove("cat-highlight-single");
//     });
// }

function hoverCategories(cat_ids) {
    cat_ids.forEach(id => {
        const cat_key = document.getElementById("cat-" + id);
        cat_key.classList.add("cat-highlight");
    });
}

function unhoverCategories(cat_ids) {
    cat_ids.forEach(id => {
        const cat_key = document.getElementById("cat-" + id);
        cat_key.classList.remove("cat-highlight");
    });
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
        const curr_event = document.getElementById("event-button-" + num_str);
        if (curr_event == null) {
            continue;
        }
        if (i == max_id) {
            curr_event.classList.add("current-event-button");
        } else {
            curr_event.classList.remove("current-event-button");
        }
    }
}

window.addEventListener("load", determinePosition);
window.addEventListener("scroll", determinePosition);