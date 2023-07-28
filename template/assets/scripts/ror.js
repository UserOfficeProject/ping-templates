let inputCountry;
let inputAffiliation;
let inputAffiliationContainer;
let inputAffiliationId;
let inputRorIdContainer;
let inputRorIdLabel;
let timeoutId;
let searchInput;

document.addEventListener("DOMContentLoaded", function () {
    inputCountry = document.querySelector('select[name="affiliationCountry"]');
    inputAffiliation = document.querySelector('input[name="affiliation"]');
    inputAffiliationContainer = document.querySelector('#container-affiliation');
    inputRorIdContainer = document.querySelector('#container-rorID');
    inputRorIdLabel = inputRorIdContainer.previousElementSibling;
    inputAffiliationId = document.querySelector('input[name="rorID"]');

    // For the Affiliation field
    searchInput = document.querySelector('input[name="affiliation"]');
    searchInput.addEventListener("keyup", debounce(searchDropdown, 500));
    searchInput.addEventListener("focus", handleSearchInputFocus)
    
    //Add searchResults after searchInput
    var searchResults = document.createElement("div");
    searchResults.className = "dropdown-list";
    searchResults.id = "searchResults";
    
    searchInput.parentNode.insertBefore(
        searchResults,
        searchInput.nextSibling
    );

    inputRorIdContainer.style.display = 'none';
    inputRorIdLabel.style.display = 'none';

  });



// TODO add country before input element
function createListItem(text, parent) {
    var listItem = document.createElement("div");
    listItem.classList.add("dropdown-list-item");
    listItem.innerText = text;
    parent.appendChild(listItem);

    return listItem;
}

function handleItemClick(item) {
    inputAffiliation.value = item.organization.name;
    inputCountry.value = item.organization.country.country_name
    inputAffiliationId.value = item.organization.id
    inputAffiliationContainer.classList.remove("unidentified-affilitation")
    searchResults.innerHTML = "";
}

function searchDropdown() {

    var query = inputAffiliation.value;
    var searchResults = document.getElementById("searchResults");

    // Clear previous search results
    searchResults.innerHTML = "";

    if (query.length >= 3) {
        // Construct the API URL with the query and country code
        var apiUrl =
            "https://ror.useroffice.ess.eu/organizations?affiliation=" +
            encodeURIComponent(query);
        var setResults = function (elem) {
            inputAffiliation.value = elem.srcElement.innerHTML;

        };
        // Make API request
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Process the API response and populate the dropdown list

                if (data.items != 0) {
                    const exactMatch = data.items.find(obj => obj.organization.name.toLowerCase() === inputAffiliation.value.toLowerCase());
                    if (exactMatch) {
                        handleItemClick(exactMatch);
                        return;
                    }
                    data.items.forEach((item) => {
                        var itemDiv = createListItem(
                            item.organization.name,
                            searchResults
                        );
                        itemDiv.onclick = () => handleItemClick(item)
                    });
                } else {
                    createListItem("No results found", searchResults);
                }
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    }
}

function debounce(func, delay) {
    return function () {
        inputAffiliationId.value = ""
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    };
}

document.addEventListener("click", function (event) {
    var target = event.target;
    var searchInput = document.querySelector('input[name="affiliation"]');
    var searchResults = document.getElementById("searchResults");

    if (target !== searchInput && target !== searchResults) {
        if(searchResults) {
            searchResults.innerHTML = "";
        }

        if (inputAffiliationId.value === "" && inputAffiliation.value !== "") {
            inputAffiliationContainer.classList.add("unidentified-affilitation")
        }
        else {
            inputAffiliationContainer.classList.remove("unidentified-affilitation")
        }
    }
});

function handleSearchInputFocus() {
    inputAffiliationContainer.classList.remove("unidentified-affilitation")
}
