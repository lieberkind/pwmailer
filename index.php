<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Patchwork Mailer</title>
    <!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container">
        <div class="row"> 
          <div class="span12">
            <h1>Generate temlpate</h1>
            <p>Paste your HTML here and press "Generate" to generate a template</p>
            <form action="editor.php">
              <textarea name="html-template" class="span12 template-html" id="html"></textarea>
              <input type="submit" class="btn" id="generate-button" value="Generate">
            </form>
        </div>
      </div>
    </div>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>

  </body>
</html>