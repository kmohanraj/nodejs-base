export default (email: string, securityCode: number) => `<html>
<body>
    <p>Hi, We received a request to reset the password for ${email}
    <br/> Your one-time Security Code is - <b>${securityCode}</b>.
    <br/> The code expires after 2 hours. Please do not share or forward this code to anyone </p>
</body>
</html>`;
