// CCDH GitHub Repos
const repoBaseURL = "https://api.github.com/repos/cancerDHC/";
var allRepos = [
    {name: "operations", data_pages: 1},
    {name: "community-development", data_pages: 1},
    {name: "data-model-harmonization", data_pages: 1},
    {name: "Terminology", data_pages: 1},
    {name: "tools", data_pages: 1}
];

// checks to see if issue is a pull request or issue.
// returns true if issue; false if pull request.
function isGHIssue(url) {
    if (url.search("/pull/") >= 0) {
        return false;
    } else {
        return true;
    }
}
//Creates a unique ID for each GitHub issue.
//Because we're gathering issues across multiple
//repos, the syntax of the id is:
// [repo name] + "Issue #" + [GitHub issue number]
function getGanttID(repoName, issueNumber){
    const str = repoName + " Issue #" + issueNumber;
    return str;
}

//Gets the task start or date from the GitHub issue
//milestone. Milestone should contain the phase (e.g.,
//"Phase 2") and quarter (e.g., "Quarter 2"). Tickets
//marked "ENDS" are truncated quarters, ending after two
//monts. Note that each phase starts in quarter 2 (4/1) and
//ends in quarter 1 of the next calendar year.
// opt = 0 gets the start date; opt = 1 gets the end date
function getGanttDate(milestone, opt, title) {
    var date = "";
    var str = "";
    if (milestone != null) {
        if (milestone.title != null) {
            str = milestone.title.toLowerCase();
            if (str.search("phase 2") >= 0) {
                //Phase 2 (Pilot): April 2020 - March 2021
                if (opt == 0) {
                    date = "2020-04-01"; // default is start of Phase 2
                    if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
                        date = "2020-04-01";
                    } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
                        date = "2020-07-01";
                    } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
                        date = "2020-10-01";
                    } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
                        date = "2021-01-01";
                    } else if (str.search("ends") >= 0) {
                        date = "2021-04-01";
                    }
                } else if (opt == 1) {
                    date = "2021-03-31"; // default is end of Phase 2
                    if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
                        date = "2020-06-30";
                    } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
                        date = "2020-09-30";
                    } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
                        date = "2020-12-31";
                    } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
                        date = "2021-03-31";
                    } else if (str.search("ends") >= 0) {
                        date = "2021-05-31";
                    }
                }
            } else if (str.search("phase 3") >= 0) {
                // Phase 3 (Production): April 2021 - March 2022
                if (opt == 0) {
                    date = "2021-04-01"; // default is start of Phase 3
                    if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
                        date = "2021-04-01";
                    } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
                        date = "2021-07-01";
                    } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
                        date = "2021-10-01";
                    } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
                        date = "2022-01-01";
                    } else if (str.search("ends") >= 0) {
                        date = "2022-04-01";
                    }
                } else if (opt == 1) {
                    date = "2022-03-31"; // default is end of Phase 3
                    if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
                        date = "2021-06-30";
                    } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
                        date = "2021-09-30";
                    } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
                        date = "2021-12-31";
                    } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
                        date = "2022-03-31";
                    } else if (str.search("ends") >= 0) {
                        date = "2022-05-31";
                    }
                }
            } else if (str.search("phase 4") >= 0) {
                // Phase 4 (Operations): April 2022 - March 2023
                if (opt == 0) {
                    date = "2022-04-01"; // default is start of Phase 4
                    if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
                        date = "2022-04-01";
                    } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
                        date = "2022-07-01";
                    } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
                        date = "2022-10-01";
                    } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
                        date = "2023-01-01";
                    } else if (str.search("ends") >= 0) {
                        date = "2023-04-01";
                    }
                } else if (opt == 1) {
                    date = "2023-03-31"; // default is end of Phase 4
                    if (str.search("quarter 2") >= 0 || str.search("q2") >= 0) {
                        date = "2022-06-30";
                    } else if (str.search("quarter 3") >= 0 || str.search("q3") >= 0) {
                        date = "2022-09-30";
                    } else if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
                        date = "2022-12-31";
                    } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
                        date = "2023-03-31";
                    } else if (str.search("ends") >= 0) {
                        date = "2023-05-31";
                    }
                }
            } else if (str.search("phase 1") >= 0) {
                // Phase 1 (Planning): Oct 2019-Mar 2020, two quarters
                if (opt == 0) {
                    date = "2019-10-01"; // default is start of Phase 1
                    if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
                        date = "2019-10-01";
                    } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
                        date = "2020-01-01";
                    }
                } else if (opt == 1) {
                    date = "2020-03-31"; // default is end of Phase 1
                    if (str.search("quarter 4") >= 0 || str.search("q4") >= 0) {
                        date = "2020-12-31";
                    } else if (str.search("quarter 1") >= 0 || str.search("q1") >= 0) {
                        date = "2020-03-31";
                    }
                }
            }
        }
    } else {
        // assign date based on title
        str = title.trim().toLowerCase();
        str = str.split(" ")[0]; //get first "word" in the title
        // Operations Phase 1 tickets (e.g., 1a1, 1a2, etc.)
        let patt = /^1[a-z]/; //starts with digit-letter
        if (patt.test(str)) {
            if (opt == 0) {
                date = "2019-10-01";
            } else if (opt == 1) {
                date = "2020-03-31";
            }
        }
        // Specific Operations Phase 2 tickets (e.g., 2a1, 2b1, etc.)
        patt = /^2[a-z]\d/; //starts with 2-letter-digit
        if (patt.test(str)) {
            if (str.search("2a1:") >= 0) { //2a1 is due Phase 2 - Quarter 1
                if (opt == 0) {
                    date = "2021-01-01";
                } else if (opt == 1) {
                    date = "2021-03-31";
                }
            } else if (str.search("2b1a") >= 0) { //2b1a is due Phase 2 - Quarter 2
                if (opt == 0) {
                    date = "2020-04-01";
                } else if (opt == 1) {
                    date = "2020-06-30";
                }
            } else if (str.search("2b1b") >= 0) { //2b1b is due Phase 2 - Quarter 2
                if (opt == 0) {
                    date = "2020-04-01";
                } else if (opt == 1) {
                    date = "2020-06-30";
                }
            } else if (str.search("2b1d") >= 0) { //2b1d is due Phase 2 - Quarter 4
                if (opt == 0) {
                    date = "2020-10-01";
                } else if (opt == 1) {
                    date = "2020-12-31";
                }
            } else if (str.search("2b1e") >= 0) { //2b1e is due Phase 3 - Quarter 4
                if (opt == 0) {
                    date = "2021-10-01";
                } else if (opt == 1) {
                    date = "2021-12-31";
                }
            } else if (str.search("2b1f") >= 0) { //2b1f is due Phase 3 - Quarter 1
                if (opt == 0) {
                    date = "2022-01-01";
                } else if (opt == 1) {
                    date = "2022-03-31";
                }
            } else if (str.search("2b1g") >= 0) { //2b1g is due Phase 3 - Quarter 4
                if (opt == 0) {
                    date = "2021-10-01";
                } else if (opt == 1) {
                    date = "2021-12-31";
                }
            }
        }
        // Specific Deliverables
        patt = /^del.e\d/; //starts with "Del.E followed by a number"
        if (patt.test(str)) {
            if (str.search("del.e2b") >= 0) {
                if (opt == 0) {
                    date = "2019-10-01";
                } else if (opt == 1) {
                    date = "2020-03-31";
                }
            }
        }
    }
    return date;
}

//Calculates the task completion percentage
function getGanttProgress(bodyText, status) {
    let progress = 0;
    if (status.search("closed") >= 0) {
        progress = 100;
    } else if (status.search("open") >= 0) {
        let checked = 0;
        let unchecked = 0;
        let total = 0;
        //count number of open check boxes
        let patt = /- \[ \]/g;
        if (patt.test(bodyText)) {
            unchecked = bodyText.match(patt).length;
        }
        //count number of closed check boxes
        patt = /- \[x\]/g;
        if (patt.test(bodyText)) {
            checked = bodyText.match(patt).length;
        }
        // calculate percent complete
        total = checked + unchecked;
        if (total > 0) {
            progress = Math.round((checked / total) * 100);
        }
    }
    return progress;
}

//Gets any task dependencies from the GitHub issue
//body. Dependencies should be included in the body
//text using the hash symbol followed by the issue
//number (e.g., #19, #8)
function getGanttDependencies(bodyText, repoName) {
    var dependencies = "";
    //check if body text contains reference to another issue
    // (e.g., #19)
    var patt = /#\d+/g;
    if (patt.test(bodyText)) {
        let result = bodyText.match(patt);
        for (let i in result) {
            // Note that the syntax of the issue names is:
            // [repo name] + " Issue # " + [GitHub issue number]
            dependencies = dependencies + repoName + " Issue " + result[i];
            if (i < (result.length - 1)) {
                dependencies = dependencies + ", ";
            }
        };
    }
    return dependencies;
}

//sort tasks
function sortTasks(alltasks) {
    var sortedTasks = [];

    // separate out operations tasks
    var opsTasks = [];
    // separate out tasks without GH milestone and/or defined start/end date
    var undatedTasks =[];

    //get list of which repos to show
    var activeRepos = whichRepos();

    for (let i in alltasks) {
        item = [];
        item.id = alltasks[i].id;
        item.name = alltasks[i].name;
        item.start = alltasks[i].start;
        item.end = alltasks[i].end;
        // disable dependencies -- too complicated
        // item.dependencies = alltasks[i].dependencies;
        item.progress = alltasks[i].progress;
        //the GitHub issue URL to link to in the pop-up
        item.url = alltasks[i].url;
        //set the color code for the progress bar
        item.custom_class = alltasks[i].repo;
        //sets the group ID
        let group = alltasks[i].group_id;
        item.group_id = group;

        //extract tasks with no dates
        if (item.start == "") {
            undatedTasks.push(item);
        } else {
            if (group == "operations") {
                //separate out operations tasks
                opsTasks.push(item);
            } else if (activeRepos.includes(group)) {
                // only push to task list if user has not delesected it
                sortedTasks.push(item);
            }
        }

    }

    //sort tasks by start date
    sortedTasks.sort((a, b) => (a.start > b.start) ? 1 : -1);

    if (activeRepos.includes("operations")) {
        //sort operations tasks by date
        opsTasks.sort((a, b) => (a.start > b.start) ? 1 : -1);
        //add operations tasks to end of task list
        for (let i in opsTasks) {
            sortedTasks.push(opsTasks[i]);
        }
    }

    //add udated tasks to very bottom
    //for (let i in undatedTasks) {
    //  sortedTasks.push(undatedTasks[i]);
    //}

    return sortedTasks;
}


//Write all GitHub issues in all repos to a TSV file.
function writeGanttDataFile() {
    // content for TSV file
    let tsvContent = "id\ttitle\tstart_date\tend_date\tprogress\tdependencies\turl\n" ;

    //check how many issues are in each repo. Max is 100 per "page" of results.
    //send each call to each repo asynchronously and wait for them all to finish
    let issuePromises = [];
    for(let i in allRepos) {
        let p = new Promise(function(resolve, reject){
            checkRepoPagination(allRepos[i], resolve, reject);
        });
        issuePromises.push(p);
    }
    //wait till all async calls have finihsed to continue getting data
    Promise.all(issuePromises).then(function() {

    // For each repo, open a URL request, parse the issue data
    // and then go to the next repo
    var request = new XMLHttpRequest();
    (function loop(j, length) {
        if (j>= length) {
            // write to the file after all the issues are collected
            window.location.href = "data:text/tab-separated-values,"
                + encodeURIComponent(tsvContent);
            return;
        }

        let repoName = allRepos[j].name;
        let url = repoBaseURL + repoName + "/issues?state=all&per_page=100"; //gets all issues, up to 100

        request.open("GET", url);
        request.onreadystatechange = function() {
            if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {

                var data = JSON.parse(request.responseText);
                //Get data for each issue
                let tsvRow = "";
                for (let i in data) {

                    // check if issue is a pull request or issue;
                    // if pull requeent, then ignore
                    if (isGHIssue(data[i].html_url)) {
                        // Create the Gantt Chart task id:
                        // [repo name] + Issue # + [issue number]
                        // Note that task dependencies reference this field.
                        tsvRow = "\"" + getGanttID(repoName, data[i].number) + "\"";

                        // Get the issue title
                        tsvRow += "\t\"" + data[i].title +"\"";

                        // Determine the start and end dates from the issue milestone
                        //start date
                        tsvRow += "\t\"" + getGanttDate(data[i].milestone, 0, data[i].title) +"\"";
                        //end date
                        tsvRow += "\t\"" + getGanttDate(data[i].milestone, 1, data[i].title) +"\"";

                        // Determine Progress completed
                        tsvRow += "\t" + getGanttProgress(data[i].body, data[i].state);

                        //Extract any dependencies from the issue body
                        tsvRow += "\t\"" + getGanttDependencies(data[i].body, repoName) +"\"";
                        // Log the repo url
                        tsvRow += "\t" + data[i].html_url + "\n";

                        tsvContent += tsvRow;
                    }
                }

                // go to next repo
                loop(j + 1, length);
            }
        }
        request.send();

    })(0, allRepos.length);
    });
};

/* The GitHub API only returns up to 100 results per request.
This function checks the number of issues in each repo. */
function checkRepoPagination(repo, resolve, reject) {
    let url = repoBaseURL + repo.name + "/issues?state=all&per_page=1&page=0";
    var xhttp;
    if (window.XMLHttpRequest) {
      // code for modern browsers
      xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        // number of GH issues will be in first item
        var n = parseInt(data[0].number);
        if (n > 100) {
            repo.data_pages = Math.ceil(n/100);
        }
        return resolve();
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


// Sends the GitHub API request for a particular repo,
// parses the response, and creates a gantt chart object
// to display the information.
// TO DO: add custom formatting of bars based on repo; see
// https://github.com/frappe/gantt/issues/175 for implementation.
// NOTE: If a repo has more than 100 issues, will need to get multiple
// "pages" of data.
function getRequest(repo, npages, alltasks, resolve, reject) {
    //gets all issues, up to 100
    let url = repoBaseURL + repo + "/issues?state=all&per_page=100&page=" + npages;
    var xhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            // Create a gantt chart task for each issue in the repo.
            // Syntax: https://frappe.io/gantt
            for (let i in data) {
                // check if issue is a pull request or issue;
                // if pull requeent, then ignore
                if (isGHIssue(data[i].html_url)) {
                    var item = [
                    {
                         "id": getGanttID(repo, data[i].number),
                         "name": data[i].title,
                         "start": getGanttDate(data[i].milestone, 0, data[i].title),
                         "end": getGanttDate(data[i].milestone, 1, data[i].title),
                         "progress": getGanttProgress(data[i].body, data[i].state),
                         "dependencies": getGanttDependencies(data[i].body,repo),
                         //get the GitHub issue URL so we can link to it in the pop-up
                         "url": data[i].html_url,
                         //group name
                         "group_id": repo,
                         //repo name
                         "repo": repo,
                    }];
                    alltasks.push(item[0]);
                }
            }

        return resolve();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

/* Gets list of repos to view in Gantt chart */
/* and returns array of GH repo names */
function whichRepos(){
    var activeRepos = [];
    var el = $(".view.active").toArray();
    for (let i in el) {
        let str = el[i].innerHTML;
        if (str == "Community Development") {
            activeRepos.push("community-development");
        } else if (str == "Data Model Harmonization") {
            activeRepos.push("data-model-harmonization");
        } else if (str == "Terminology") {
            activeRepos.push("Terminology");
        } else if (str == "Tools") {
            activeRepos.push("tools");
        } else if (str == "Operations") {
            activeRepos.push("operations");
        }
    }
    return activeRepos;
}

function createTasks() {

    //get list of selected repos
    let repos = whichRepos();

    //check how many issues are in each repo.
    // Max is 100 per "page" of results.
    // send each call to each repo asynchronously
    // and wait for them all to finish
    let issuePromises = [];
    for(let i in allRepos) {
        let p = new Promise(function(resolve, reject){
            checkRepoPagination(allRepos[i], resolve, reject);
        });
        issuePromises.push(p);
    }
    //wait till all async calls have finihsed to continue getting data
    Promise.all(issuePromises).then(function() {
        var alltasks = [];

        //send each call to each repo asynchronously and
        // wait for them all to finish
        let dataPromises = [];
        for(let i in allRepos) {
            //check which repo to get and how many pages of results
            let npages = allRepos[i].data_pages;
            for (let j = 0; j < npages; j++) {
                let p = new Promise(function(resolve, reject){
                    getRequest(allRepos[i].name, npages, alltasks, resolve, reject);
                });
                dataPromises.push(p);
            }
        }
        Promise.all(dataPromises).then(function() {
            var tasks = sortTasks(alltasks);

            var gantt = new Gantt(".gantt-target", tasks, {
                //turn off editing
                draggable: false,
                hasArrows: false,
                //create custom groupings
                groups: [
                    {
                        id: "operations",
                        name: "Operations",
                        bar_class: "bar-ops"
                    },
                    {
                        id: "community-development",
                        name: "Community Development Workstream",
                        bar_class: "bar-cd"
                    },
                    {
                        id: "data-model-harmonization",
                        name: "Data Model Harmonization Workstream",
                        bar_class: "bar-dmh"
                    },
                    {
                        id: "Terminology",
                        name: "Ontology and Terminology Ecosystem Workstream",
                        bar_class: "bar-term"
                    },
                    {
                        id: "tools",
                        name: "Tools and Data Quality Workstream",
                        bar_class: "bar-tools"
                    }
                ],

                //create a custom pop-up with the task group name, URL, title and dates
                custom_popup_html: function(task) {
                  return `
                    <div class="details-container">
                      <div class="popup_head">${task._group.name}</div>
                      <div class="title" style="border-bottom: 1px solid #a3a3ff;">${task.name}</div>
                      <div class="subtitle">
                      Due: ${task.end} &nbsp;&nbsp;&nbsp;&nbsp; ${task.progress}% Complete<br />
                      <a href=${task.url} target="_blank">${task.url}</a>
                      </div>
                    </div>
                  `;
                }
            });

            // deletes extra blank space at bottom of chart
            var new_height = gantt.$svg.getAttribute("height") - 100;
            gantt.$svg.setAttribute("height", new_height);

            //sets the default view mode
            gantt.change_view_mode("Month");

            //change view mode dynamically
            $(function() {
                $(".timeline-view").on("click", "button", function() {
                    $btn = $(this);
                    var mode = $btn.text();
                    gantt.change_view_mode(mode);
                    $btn.parent().find("button").removeClass("active");
                    $btn.addClass("active");
                });
            });

            //toggle workstream tasks dynamically
            $(function() {
                $(".chart-view").on("click", "button", function() {
                    $btn = $(this);
                    var ws = $btn.text();
                    $btn.toggleClass("active");

                    //re-sort tasks to show/hide selected workstreams
                    tasks = sortTasks(alltasks);
                    gantt.refresh(tasks);
                });
            });
        });
    });
}
createTasks();
