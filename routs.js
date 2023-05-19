const express = require('express');
const router = express.Router();
const Questions = require('./questions.js');

router.get('/q/:id', function (req, res) {
   const id = req.params.id;
   if (id == 1) {
      req.session.score = 0;
      req.session.q1 = Number.NEGATIVE_INFINITY;
      req.session.q2 = Number.NEGATIVE_INFINITY;
      req.session.q3 = Number.NEGATIVE_INFINITY;
      req.session.q4 = Number.NEGATIVE_INFINITY;
      req.session.q5 = Number.NEGATIVE_INFINITY;
   }

   if (id >= 1 && id <= 5) {

      res.render('q_view', {
         score: req.session.score,
         question: Questions.questions[(id - 1)],
         id: req.params.id
      });
   }
   else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
   }

});

router.post('/q/:id', function (req, res) {
   const id = req.params.id;
   if (id >= 1 && id <= 4) {
      req.session['q' + id] = new Number(req.body.answer);

      console.log(req.session['q' + id]);
      const newId = Number(id) + 1;
      res.redirect("/survey/q/" + newId)
   }
   if (id == 5) {
      req.session.q5 = new Number(req.body.answer);
      res.redirect('/survey/result');
   }
   else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
   }
});


router.get('/result', function (req, res) {

   let score = 0;
   req.session.q1 = Number.NEGATIVE_INFINITY;
   req.session.q2 = Number.NEGATIVE_INFINITY;
   req.session.q3 = Number.NEGATIVE_INFINITY;
   req.session.q4 = Number.NEGATIVE_INFINITY;
   req.session.q5 = Number.NEGATIVE_INFINITY;
   if (req.session.q1 == 9) {
      score++;
   }

   if (req.session.q1 == 8) {
      score++;
   }


   res.render('result_view');


});


//export this router to use in our index.js
module.exports = router;