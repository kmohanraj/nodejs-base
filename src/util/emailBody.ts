export default (
  totalRows: number,
  successCount: number,
  failCount: number
) => `<html>
    <body>
        <h3>Bulk Upload Summary</h3>
        <p>Rows proceessed: ${totalRows} </p>
        <p>Rows succeeded: ${successCount} </p>
        <p>Rows failed: ${failCount} </p>
    </body>
</html>`;
