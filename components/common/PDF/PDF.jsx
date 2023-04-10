import {useEffect, useRef} from 'react';

const PDF = ({pdfPath, ...props}) => {

    const viewer = useRef(null);
    const pdfViewer = useRef(false);

    useEffect(() => {
        if(!pdfViewer.current){
        import("@pdftron/pdfjs-express-viewer")
      .then(() => {
          WebViewer(
          {
            path: '/',
            css:'/styles/pdf_viewer.css',
            // initialDoc: '/pdfs/sample.pdf',
            initialDoc: pdfPath,
            licenseKey: 'BODVt5HLwkGSrI8l52V6',
            disabledElements: [
              "menuButton",
              "panToolButton",
              "viewControlsButton",
              "textSelectButton",
              "moreButton",
              "selectToolButton",
              "fitButton",
              "searchButton",
            ],
          },
          viewer.current,
          document.getElementById("viewer")
    
        ).then((instance) => {
            // now you can access APIs through the WebViewer instance
            const { Core } = instance;
    
            const iframeDoc = instance.UI.iframeWindow.document;
            const container = iframeDoc.querySelector('.DocumentContainer');
            container.style.backgroundColor = "#F1F7FD";
            console.log("C", container)
    
            instance.UI.setHeaderItems((header) => {
              header.getHeader('default').push({
                img: "icon-header-full-screen",
                index: -1,
                type: "actionButton",
                element: 'fullScreenButton',
                onClick: () => {
                  instance.UI.toggleFullScreen()
                }
              });
            });
    
            // adding an event listener for when a document is loaded
            Core.documentViewer.addEventListener('documentLoaded', () => {
            });
    
            // adding an event listener for when the page number has changed
            Core.documentViewer.addEventListener('pageNumberUpdated', (pageNumber) => {
              console.log(`Page number is: ${pageNumber}`);
            });
          });})
        }
    
        pdfViewer.current = true;
    
        }, [pdfPath]);


        return (
            <div className="webviewer" ref={viewer}></div>
        )

}

export default PDF;