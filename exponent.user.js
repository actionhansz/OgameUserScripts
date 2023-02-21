// ==UserScript==
// @name OgameExponent
// @namespace pimmel
// @version 0.7
// @description Make ogame great again
// @author Actionhans
// @match *://*/*?page=ingame&component=fleetdispatch*
// @grant   GM_getValue
// @grant   GM_setValue
// ==/UserScript==


(function () {
    'use strict';

    const toggleExecute = true;
    const fullfleet = false;
    const runOnce = false;

    let ecoSpeed = 8;


    let fleet = {}
    //load uservalues
    if (GM_getValue("userSettings") != null && GM_getValue("userSettings") == true) {
        fleet.fighterLight = GM_getValue("fighterLight")
        fleet.fighterHeavy = GM_getValue("fighterHeavy")
        fleet.cruiser = GM_getValue("cruiser")
        fleet.battleship = GM_getValue("battleship")
        fleet.interceptor = GM_getValue("interceptor")
        fleet.destroyer = GM_getValue("destroyer")
        fleet.reaper = GM_getValue("reaper")
        fleet.explorer = GM_getValue("explorer")
        fleet.espionageProbe = GM_getValue("espionageProbe")
        fleet.transporterLarge = GM_getValue("transporterLarge")
        fleet.transporterSmall = GM_getValue("transporterSmall")
    }
    //load default values
    else {
        fleetDefault()
    }

    function fleetDefault() {
        fleet = {
            fighterLight: 0,
            fighterHeavy: 0,
            cruiser: 0,
            battleship: 0,
            interceptor: 0,
            destroyer: 0,
            reaper: 1,
            explorer: 1,
            espionageProbe: 1,
            transporterSmall: 0,
            transporterLarge: 3200
        }
        GM_setValue("fighterLight", fleet.fighterLight);
        GM_setValue("fighterHeavy", fleet.fighterHeavy)
        GM_setValue("cruiser", 0)
        GM_setValue("battleship", 0)
        GM_setValue("interceptor", 0)
        GM_setValue("destroyer", 0)
        GM_setValue("reaper", 1)
        GM_setValue("explorer", 1)
        GM_setValue("espionageProbe", 1)
        GM_setValue("transporterSmall", 0)
        GM_setValue("transporterLarge", 3200)
    }

    console.log(fleet)


    let baseMenu = `
<div class="allornonewrap">
    <div class="secondcol fleft">
      <span>
        <a id="showHideFleetPicker" href="javascript: void(0);" class="dark_highlight_tablet" style="color:#6f9fc8;display:inline-block;height:18px;width:125px">
          <span class="icon icon_combatunits"></span>
        Manage Expo Fleet
        </a>
      </span>
      <div class="clearfloat"></div>
    </div>
    <div class="firstcol fleft">
    <span class="icon icon_combatunits"></span>
    Expeditionszeit:
                        <select name="expeditionTimeSelector" id="expeditionTimeSelector" class="dropdownInitialized" ">
                                                                                                                            <option value="1">1</option>
                                                                                                                            <option value="2">2</option>
                                                                                                                            <option value="3">3</option>
                                                                                                                            <option value="4">4</option>
                                                                                                                            <option value="5">5</option>
                                                                                                                            <option value="6">6</option>
                                                                                                                            <option value="7">7</option>
                                                                                                                            <option value="8">8</option>
                                                                                                                            <option value="9">9</option>
                                                                                                                            <option value="10">10</option>
                                                                                                                            <option value="11">11</option>
                                                                                                                            <option value="12">12</option>
                                                                                                                            <option value="13">13</option>
                                                                                                                            <option value="14">14</option>
                                                                                                                            <option value="15">15</option>
                        </select>
                        <span class="value">h</span>
    </div>
       <div class ="firstcol fright">
        <a id="abort" href="javascript:void(0);" class="continue on" style="filter: hue-rotate(-90deg);"><span>abort</span></a>
        <a id="autoSend" href="javascript:void(0);" class="continue on"><span>autosend</span></a>
   </div>
    <div class="clearfloat"></div>
</div>`;

    let fleetPreview = `
    <table cellpadding="0" cellspacing="0" class="list ship_selection_table" id="mail"><tbody><tr>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech204" width="28" height="28" alt="Light Fighter" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Light Fighter</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.fighterLight} id="ship204" name="fighterLight" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech205" width="28" height="28" alt="Heavy Fighter" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Heavy Fighter</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.fighterHeavy} id="ship205" name="fighterHeavy" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td></tr><tr>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech206" width="28" height="28" alt="Cruiser" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Cruiser</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.cruiser} id="ship206" name="cruiser" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech207" width="28" height="28" alt="Battleship" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Battleship</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.battleship} id="ship207" name="battleship" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td></tr><tr>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech215" width="28" height="28" alt="Battlecruiser" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Battlecruiser</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.interceptor} id="ship215" name="interceptor" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech213" width="28" height="28" alt="Destroyer" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Destroyer</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.destroyer} id="ship213" name="destroyer" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td></tr><tr>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech218" width="28" height="28" alt="Reaper" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Reaper</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.reaper} id="ship218" name="reaper" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td></tr><tr>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech219" width="28" height="28" alt="Pathfinder" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Pathfinder</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value="${fleet.explorer}" id="ship219" name="explorer" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech210" width="28" height="28" alt="Espionage Probe" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Espionage Probe</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.espionageProbe} id="ship210" name="espionageProbe" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td>
        </tr>
        <tr>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech202" width="28" height="28" alt="Small Cargo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Small Cargo</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value=${fleet.transporterSmall} id="ship202" name="transporterSmall" autocomplete="off" onblur="checkIntInput(this, 0, null);" onkeyup="checkIntInput(this, 0, null);">
        </td>
        <td class="ship_txt_row textLeft images">
            <div class="shipImage float_left">
                <img class="tech203" width="28" height="28" alt="Large Cargo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">
            </div>
            <p>Large Cargo</p>
        </td>
        <td class="ship_input_row shipValue">
            <input type="text" pattern="[0-9,.]*" class="textRight textinput expeditionSchwanz" size="3" value="${fleet.transporterLarge}" id="ship203" name="transporterLarge" autocomplete="off" onblur="checkIntInput(this, 0, null)" onkeyup="checkIntInput(this, 0, null);">
        </td></tr>
        <tr>
        <td colspan="4" class="textRight name">
        <a href="javascript: void(0);" id="deleteFleet" class="tooltip js_hideTipOnMobile standardFleetReset float_right icon_link ogl-tooltipReady ogl-tooltipInit" data-title="Delete template/input">
        <span class="icon icon_trash"></span>
        </a>
        <a href="javascript: void(0);" id="saveFleet" class="tooltip js_hideTipOnMobile standardFleetSubmit float_right icon_link ogl-tooltipReady ogl-tooltipInit" data-title="Save fleet">
        <span class="icon icon_checkmark"></span>
        </a>
        </td>
        </tr>
        </tbody>
        </table>
`

    //create base menu
    let element = document.createElement('div');
    element.setAttribute("id", "allornone")
    element.setAttribute("style", "position:relative")
    element.innerHTML = baseMenu;
    let main = document.querySelector('.content');
    main.appendChild(element);

    //create fleet picker
    let fleetPicker = document.createElement('div');
    fleetPicker.setAttribute("id", "fleetPicker")
    fleetPicker.setAttribute("style", "display: none")
    fleetPicker.innerHTML = fleetPreview;
    element.appendChild(fleetPicker);

    //create fleet picker tablelistener
    let tableShown = false;
    let toggleFleetTable = document.querySelector('#showHideFleetPicker');
    toggleFleetTable.addEventListener('click', function () {
        if (tableShown) {
            fleetPicker.setAttribute("style", "display: none");
            tableShown = false;
        } else {
            fleetPicker.setAttribute("style", "display: flex");
            tableShown = true;
        }
    });

    //load expoTime
    let expoTime = 1;
    if (GM_getValue("expoTime") != null) {
        expoTime = GM_getValue("expoTime")
        document.getElementById("expeditionTimeSelector").value = expoTime
    }

    let timePicker = document.querySelector('#expeditionTimeSelector');
    timePicker.addEventListener('change', function () {
        expoTime = timePicker.value;
        GM_setValue("expoTime", expoTime);
        console.log("saved Expo Time to: " + expoTime);
    });


    let shipSelect = document.querySelectorAll('.expeditionSchwanz');
    let saveFleet = document.querySelector('#saveFleet');
    saveFleet.addEventListener("click", () => {
        updateShips(shipSelect);
    });
    let deleteFleet = document.querySelector('#deleteFleet');
    deleteFleet.addEventListener("click", () => {
            deleteShips(shipSelect);
        }
    );

    function deleteShips(shipSelect) {
        shipSelect.forEach((shipSelect) => {
            shipSelect.value = 0;
        });
        GM_setValue("userSettings", false);
        fleetDefault();
        location.href = `javascript:fadeBox("Fleet Deleted!", false, () => {}, 2500);`;
    }

    function updateShips(shipSelect) {
        GM_setValue("userSettings", true);
        shipSelect.forEach((shipSelect) => {
            GM_setValue(shipSelect.name, shipSelect.value);
        });
        fleet.fighterLight = GM_getValue("fighterLight")
        fleet.fighterHeavy = GM_getValue("fighterHeavy")
        fleet.cruiser = GM_getValue("cruiser")
        fleet.battleship = GM_getValue("battleship")
        fleet.interceptor = GM_getValue("interceptor")
        fleet.destroyer = GM_getValue("destroyer")
        fleet.reaper = GM_getValue("reaper")
        fleet.explorer = GM_getValue("explorer")
        fleet.espionageProbe = GM_getValue("espionageProbe")
        fleet.transporterLarge = GM_getValue("transporterLarge")
        fleet.transporterSmall = GM_getValue("transporterSmall")
        location.href = `javascript:fadeBox("Fleet Saved!", false, () => {}, 2500);`;
    }

    if (GM_getValue("running") != null && GM_getValue("running") == true) {
        console.log("running")
    } else {
        console.log("not running")
    }

    const fleetSlots = document.querySelector('#slots').textContent.replace(/\s/g, '')

    //get fleet Slots
    let str = fleetSlots
    str = str.replace("Flotten:", "")
        .replace("Expeditionen:", ":")
        .split(":")
    let fleetSlotsUsed = str[0].split("/")[0]
    let fleetSlotsMax = str[0].split("/")[1]
    let expoSlotsUsed = str[1].split("/")[0]
    let expoSlotsMax = str[1].split("/")[1]
    let fleetSlotsFree = fleetSlotsMax - fleetSlotsUsed
    let expoSlotsFree = expoSlotsMax - expoSlotsUsed
    let usableSlots

    console.log("expoSlotsUsed = " + expoSlotsUsed);

    console.log("fleetSlotsUsed = " + fleetSlotsUsed);

    if (expoSlotsFree < fleetSlotsFree) {
        usableSlots = expoSlotsFree
    } else {
        usableSlots = fleetSlotsFree
    }
    console.log("Usable Slots: " + usableSlots);


    //get Planet / Moon system
    const planetSystem = document.querySelector('input#system').value;
    console.log("planetSystem = " + planetSystem);


    //get start system
    let startSystem = Math.round(planetSystem - expoSlotsMax / 2);
    if (startSystem <= 0) {
        startSystem = 1;
    }

    if (parseInt(planetSystem) + Math.round(expoSlotsMax / 2) >= 499) {
        startSystem = 499;
    }
    console.log("startSystem = " + startSystem);

    //get current system
    let currentSystem;
    if (startSystem == 499) {
        currentSystem = startSystem - parseInt(expoSlotsUsed);
    }
    else {
        currentSystem = startSystem + parseInt(expoSlotsUsed);
    }

    console.log("currentExpoSystem = " + currentSystem);

    let startBtn = document.querySelector('#autoSend');
    startBtn.addEventListener('click', function () {
        $(document).ready(function () {
            //set running between reloads
            GM_setValue('running', true);

            //getShipAmount
            for (const [key, value] of Object.entries(fleet)) {
                console.log("Number of " + key + ": " + Number($('.' + key + ' .amount').attr('data-value')));
                if ((Number($('.' + key + ' .amount').attr('data-value')) >= value * usableSlots) && (fullfleet == false)) {
                    // GM_setValue(key, value);
                    console.log("owned " + key + " above selected " + key + ". using userselection (" + value + ")");
                } else {
                    if (key == "explorer" || key == "espionageProbe") {
                        GM_setValue(key, 1);
                        console.log("not sending more then one " + key + "");
                    } else {
                        GM_setValue(key, Math.round((Number($('.' + key + ' .amount').attr('data-value')) - 1) / usableSlots));
                        console.log("owned " + key + " below selected " + key + " Or Fullfleet beeing Used. using AI (maximum Possible) selection: " + GM_getValue(key) + " (rounded down)");
                    }
                }
            }

            location.reload();
        });
    });
    let abortBtn = document.querySelector('#abort');
    abortBtn.addEventListener('click', function () {
        GM_setValue('running', false);
        location.reload();
    });

    //setting running false if slots full
    if (usableSlots == 0) {
        GM_setValue('running', false);
        (GM_setValue("expoTime", 1));
    }

    //execute when running is true
    if (GM_getValue("running") == true && usableSlots > 0 && toggleExecute == true) {
        $(document).ready(function () {
            //wait time after reload
            let randomTimeoutreload = Math.random() * (3000 - 2000) + 2000;
            console.log("Timeout (reload): " + randomTimeoutreload);
            setTimeout(function () {
                console.log("running is true");
                //fill Ships
                for (const [key, value] of Object.entries(fleet)) {
                    console.log("Filling " + key + " with " + GM_getValue(key) + " ships");
                    if (GM_getValue(key) > 0) {
                        $('[name=' + key + ']').val(GM_getValue(key)).keyup();
                    }
                }

                //go to next page
                let randomTimeoutWeiter = Math.random() * (2000 - 1500) + 1500;
                console.log("Timeout (reload): " + randomTimeoutWeiter);
                setTimeout(function () {
                    $('[id=continueToFleet2]').click();

                    //fill system
                    let randomTimeoutSystem = Math.random() * (2100 - 800) + 800;
                    setTimeout(function () {
                        $('input#system').val(currentSystem).keyup();
                        //fill position
                        let randomTimeoutPosition = Math.random() * (2000 - 800) + 800;
                        setTimeout(function () {
                            $('input#position').val('16').keyup();

                            //fill expo time
                            console.log("expoTime = " + GM_getValue("expoTime"));
                            if (GM_getValue("expoTime") > 1) {
                                console.log("expoTime > 1" + GM_getValue("expoTime"));
                                document.querySelector('#expeditiontime').value = GM_getValue("expoTime");
                            }

                            //send fleet after random time
                            let randomTimeoutsend = Math.random() * (2500 - 1100) + 1100;
                            setTimeout(function () {
                                $('[id=sendFleet]').click();
                            }, randomTimeoutsend);

                            if (runOnce == true) {
                                GM_setValue('running', false);
                            }

                            //reload if something went wrong
                            let safetyreload = Math.random() * (16000 - 14000) + 14000;
                            setTimeout(function () {
                                location.reload();
                            }, safetyreload);
                        }, randomTimeoutPosition);
                    }, randomTimeoutSystem);
                }, randomTimeoutWeiter);
            }, randomTimeoutreload);
        });
    }

})();