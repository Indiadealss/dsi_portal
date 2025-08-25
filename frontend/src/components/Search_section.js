import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Search_section() {
    return (
        <>
            <div id="hp-search-form" topmost="true" class="pageComponent inPageSearchBox__inPageSearchBox desktop_search"
                data-label="IN_PAGE_SEARCH" style={{ marginTop: "-3.5rem" }}>
                <div id="inPageSearchForm" class="InPageTabs">
                    <div class="tab__tabs">
                        <div id="inPageSearchForm_0" class="tabChild list_header_semiBold active pageComponent Ng500   "
                            data-label="BUY"
                            data-custominfo="{&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;},&quot;location&quot;:{&quot;id&quot;:&quot;&quot;,&quot;type&quot;:&quot;CITY&quot;}}}"
                            testid="BUY">Buy</div>
                        <div id="inPageSearchForm_1" class="tabChild list_header_semiBold  pageComponent Ng500   "
                            data-label="RENT"
                            data-custominfo="{&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;},&quot;location&quot;:{&quot;id&quot;:&quot;&quot;,&quot;type&quot;:&quot;CITY&quot;}}}"
                            testid="RENT">Rent</div>
                        <div id="inPageSearchForm_2"
                            class="tabChild list_header_semiBold  pageComponent Ng500  tab__relativePos " data-label="NL"
                            data-custominfo="{&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;},&quot;location&quot;:{&quot;id&quot;:&quot;&quot;,&quot;type&quot;:&quot;CITY&quot;}}}"
                            testid="NL">New Launch
                        </div>
                        <div id="inPageSearchForm_3" class="tabChild list_header_semiBold  pageComponent Ng500   "
                            data-label="PG"
                            data-custominfo="{&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;},&quot;location&quot;:{&quot;id&quot;:&quot;&quot;,&quot;type&quot;:&quot;CITY&quot;}}}"
                            testid="PG">PG / Co-living</div>
                        <div id="inPageSearchForm_4" class="tabChild list_header_semiBold  pageComponent Ng500   "
                            data-label="COMM"
                            data-custominfo="{&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;},&quot;location&quot;:{&quot;id&quot;:&quot;&quot;,&quot;type&quot;:&quot;CITY&quot;}}}"
                            testid="COMM">Commercial</div>
                        <div id="inPageSearchForm_5" class="tabChild list_header_semiBold  pageComponent Ng500   "
                            data-label="PLOTS"
                            data-custominfo="{&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;},&quot;location&quot;:{&quot;id&quot;:&quot;&quot;,&quot;type&quot;:&quot;CITY&quot;}}}"
                            testid="PLOTS">Plots/Land</div>
                        <div id="inPageSearchForm_6" class="tabChild list_header_semiBold  pageComponent Ng500   "
                            data-label="PROJ"
                            data-custominfo="{&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;},&quot;location&quot;:{&quot;id&quot;:&quot;&quot;,&quot;type&quot;:&quot;CITY&quot;}}}"
                            testid="PROJ">Projects</div>
                        <div id="inPageSearchForm_6" class="tabChild list_header_semiBold  pageComponent Ng500   "
                            data-label="PROJ"
                            data-custominfo="{&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;},&quot;location&quot;:{&quot;id&quot;:&quot;&quot;,&quot;type&quot;:&quot;CITY&quot;}}}"
                            testid="PROJ">Post property</div>

                        <div class="tab__bar" style={{ width: "54px", left: "20px" }}></div>
                    </div>
                    <div class="tab__tabsContent">
                        <div class="">
                            <div class="inPageSearchBox__searchTabWrap">
                                <div class="inPageSearchBox__inputFilterOptions">
                                    <div class="inPageSearchBox__basicFilter">
                                        <div class="list_header_semiBold Ng500 inPageSearchBox__searchDropdown">
                                            <div class="">All Residential</div>
                                        </div>
                                        <div class="inPageSearchBox__searchField">
                                            <div id="d_landmark_inPageSearchBox"
                                                class="pageComponent inPageSearchBox__searchFieldInput"
                                                data-label="SEARCH_INPUT" data-custominfo="{}"><i
                                                    class="iconS_Common_20 icon_search"></i>
                                                <div class="component__DeskSfInput"><input type="text" name="keyword"
                                                    class="component__searchInput" id="keyword2" autocomplete="off"
                                                    value="" />
                                                    <div class="component__suggest"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pageComponent inPageSearchBox__nearMe" data-label="NEAR_ME_SEARCH"
                                        data-custominfo="{&quot;custom_object&quot;:{&quot;preference&quot;:&quot;S&quot;,&quot;res_com&quot;:&quot;R&quot;,&quot;search_type&quot;:&quot;LS&quot;}}"
                                        style={{ cursor: "pointer", height: "40px", whitespace: "nowrap", borderradius: "36px", display: "flex", alignitems: "center", marginright: "12px" }}>
                                        <img src="./images/icon/nearMeV2.png" width="40"
                                            height="50" />
                                    </div>
                                    <div class="pageComponent undefined" data-label="VOICE_SEARCH_HP_DESKTOP" topmost="true">
                                        <section>
                                            <div class="pageComponent undefined" data-label="VOICE_SEARCH"
                                                style={{ height: "40px" }}>
                                                <div class="SpeechToText__voiceIcon" style={{ height: "40px" }}><img
                                                    src="./images/icon/mic.png"
                                                    style={{ height: "40px" }} /><img

                                                        class=" SpeechToText__voiceTag " /></div>
                                            </div>
                                        </section>
                                    </div>
                                    <div class="inPageSearchBox__searchBtn"><button id="searchform_search_btn" type="submit"
                                        variant="primaryRegular" data-label="SEARCH_SUBMIT"
                                        data-custominfo="{&quot;custom_object&quot;:{&quot;availableFor&quot;:[],&quot;sharing&quot;:[],&quot;city&quot;:&quot;&quot;,&quot;bedroom_num&quot;:[],&quot;class&quot;:[],&quot;locality&quot;:[],&quot;brandIds&quot;:[],&quot;keyword&quot;:&quot;&quot;,&quot;preference&quot;:&quot;S&quot;,&quot;area_unit&quot;:&quot;1&quot;,&quot;availability&quot;:[],&quot;res_com&quot;:&quot;R&quot;,&quot;property_type&quot;:&quot;&quot;},&quot;payload&quot;:{&quot;basic_info&quot;:{&quot;rescom&quot;:&quot;R&quot;,&quot;preference&quot;:&quot;S&quot;}}}"
                                        class="pageComponent buttons__primaryRegular     undefined "
                                        data-sstheme="searchform_search_btn_BUTTON_TOP_LEVEL"><span class=" "
                                            data-sstheme="searchform_search_btn_BUTTON_SPAN">Search</span></button></div>
                                </div>
                                <div class="inPageSearchBox__searchFilters false "></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inPageSearchBox__overlay"></div>
            </div>
            <div class="css-175oi2r r-1adg3ll mobile_serach"><div tabindex="0"
                class="css-175oi2r r-1i6wzkk r-lrvibr r-1loqt21 r-1otgn73 r-p1pxzi r-1jgb5lz r-158g0x6 r-k8qxaj r-bnwqim"
                style={{ transitionduration: "0s" }}><div
                    class="css-175oi2r r-1awozwy r-1777fci"
                    data-testid="SEARCH_BAR"><div
                        class="css-175oi2r r-14lw9ot r-36uq19 r-1xfd6ze r-rs99b7 r-u43jn0 r-1quu1zo r-18u37iz r-1wtj0ep r-thmkab r-23eiwj r-e7q0ms"><div
                            aria-label class="css-175oi2r r-1mlwlqe r-1udh08x r-417010"
                            style={{ height: "20px", width: "20px", marginright: "6px", marginleft: "-6px" }}><div
                                class="css-175oi2r r-1niwhzg r-vvn4in r-u6sd8q r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw r-4gszlv"
                                style={{ backgroundimage: "url(&quot;https://static.99acres.com/universalhp/img/grey_sicon.shared.svg&quot;)" }}></div><img
                                alt draggable="false"
                                src="https://static.99acres.com/universalhp/img/grey_sicon.shared.svg"
                                class="css-9pa8cd" /></div><div tabindex="0"
                                    class="css-175oi2r r-1i6wzkk r-lrvibr r-1loqt21 r-1otgn73 r-1472mwg r-1qfoi16 r-e7q0ms"
                                    style={{ transitionduration: "0s" }}><div dir="auto"
                                        class="css-1rynq56 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-obd0qt r-fov093 r-6koalj r-98loyc r-1b43r93 r-13uqrnb r-ojf8lh r-1777fci r-135wba7"
                                        data-testid="SEARCH_BAR_SUGGESTION_TEXT"><span
                                            class="css-1qaijid r-13e3bsn r-98loyc r-1b43r93 r-13uqrnb r-16dba41 r-135wba7">Search
                                </span><div
                                    class="css-175oi2r r-xoduu5 r-150rngu r-eqz5dr r-16y2uox r-1wbh5a2 r-1sncvnh r-1ocf4r9 r-11yh6sk r-buy8e9 r-19z077z r-2eszeu"
                                    style={{ height: "24px", paddingtop: "6px" }}><div
                                        class="css-175oi2r r-xoduu5"><div
                                            class="css-175oi2r r-xoduu5 r-cpa5s6"><span
                                                class="css-1qaijid r-13e3bsn r-98loyc r-1b43r93 r-13uqrnb r-16dba41 r-135wba7 r-1udh08x r-1udbk01 r-3s2u2q">"Noida"</span></div><div
                                                    class="css-175oi2r r-xoduu5 r-cpa5s6"><span
                                                        class="css-1qaijid r-13e3bsn r-98loyc r-1b43r93 r-13uqrnb r-16dba41 r-135wba7 r-1udh08x r-1udbk01 r-3s2u2q">"Sector 150 Noida"</span></div><div
                                                            class="css-175oi2r r-xoduu5 r-cpa5s6"><span
                                                                class="css-1qaijid r-13e3bsn r-98loyc r-1b43r93 r-13uqrnb r-16dba41 r-135wba7 r-1udh08x r-1udbk01 r-3s2u2q">"ATS Pristine Sector 150 Noida"</span></div><div
                                                                    class="css-175oi2r r-xoduu5 r-cpa5s6"><span
                                                                        class="css-1qaijid r-13e3bsn r-98loyc r-1b43r93 r-13uqrnb r-16dba41 r-135wba7 r-1udh08x r-1udbk01 r-3s2u2q">"3 BHK flats for sale in Noida"</span></div><div
                                                                            class="css-175oi2r r-xoduu5 r-cpa5s6"><span
                                                                                class="css-1qaijid r-13e3bsn r-98loyc r-1b43r93 r-13uqrnb r-16dba41 r-135wba7 r-1udh08x r-1udbk01 r-3s2u2q">"New Projects in Noida"</span></div></div></div></div></div><div
                                                                                    class="pageComponent VoiceSearchWrapper__voiceCont"
                                                                                    data-label="VOICE_SEARCH_HP_MSite" topmost="true"><section
                                                                                        data-hydration-on-demand="true"><div
                                                                                            class="pageComponent undefined"
                                                                                            data-label="VOICE_SEARCH" style={{ height: "20px" }}><div
                                                                                                class="SpeechToText__voiceIcon"
                                                                                                style={{ height: "20px" }}><img
                                            src="https://www.99acres.com/universalapp/img/mobMic.png"
                                            style={{ height: "20px" }} /></div></div></section></div></div></div></div></div>
        </>
    )
}

export default Search_section




