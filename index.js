var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const express = require('express')
const app = express()
const port = process.env.PORT || 5000


app.use(express.urlencoded())

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => {
    var from_email = new helper.Email('test@example.com');
    var to_email = new helper.Email('neilpturley@gmail.com');
    var subject = 'Hello World from the SendGrid Node.js Library!';
    var content = new helper.Content('text/plain', JSON.stringify(req.body) );
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });
      
      sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
