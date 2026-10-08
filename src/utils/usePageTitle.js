// Function to update the page title based on the provided title. If no title is provided, it defaults to "AwesomeShop".

export function usePageTitle(title) {
    if (title) {document.title = "AwesomeShop — " + title} else {document.title = "AwesomeShop";}
}