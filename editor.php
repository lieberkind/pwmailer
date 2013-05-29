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
          <h1>Edit mail template</h1>
          <p>Fill in e-mail options and missing text fields </p>
        </div>
        <div class="span6" id="field-container">
        </div>
        <div class="span6">
          <div class="span6 template-container" id="template-container">
            <?php echo $_GET['html-template']; ?>
          </div>
          <form class="editor-form" action="mailer.php">
            <input type="hidden" name="html-template" value="">
            <input type="submit" value="Okay, I'm ready to send!" class="float-right" id="ready-to-send">
          </form>
        </div>
      </div>
    </div>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>