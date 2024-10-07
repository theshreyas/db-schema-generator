import React, { useState, useEffect } from "react";
import { Container, Button, Card, ProgressBar, ListGroup, Alert } from "react-bootstrap";

const questionsData = [
  {
    question: "You need to add a new column to the sales_shipment and the sales_shipment_grid tables. Other than utilizing the default addColumn methods, what way is automatic?",
    options: [" Ensure your UpgradeSchema class extends CoreSetup and call <code>$this->addSalesColumns()</code>.", "On the <code>ModuleDataSetupInterface</code>, call <code> $setup->getSales()->addColumn()</code>.", "Utilize the SalesSetup class’ addAttribute method.", "Utilize the <code>EavSetup::addColumn()</code> method."],
    answers: ["Utilize the SalesSetup class’ addAttribute method."],
    explanation: "",
  },
  {
    question: "While reviewing the Magento database, you encounter multiple tables with the '_cl' suffix, like <code>catalog_category_product_cl</code>.<br> What is the purpose of such tables?",
    options: ["_cl stands for 'cluster', and the tables contain information needed to maintain optimal data sharding for improved performance.", "_cl stands for 'clean', and the tables contain temporary information needed for some calculations. These tables are cleaned by the cron job.", "_cl stands for 'change log', and the tables contain IDs of changed entities to be reindexed.", "_cl stands for 'cache lookup', and the tables contain information that the Magento caching system is using when the database is used as cache backend."],
    answers: ["_cl stands for 'change log', and the tables contain IDs of changed entities to be reindexed."],
    explanation: "",
  },
  {
    question: "You are debugging a problem related to a custom EAV attribute. You found a Data Patch that adds the attribute. Among others, it sets the property: <code>'visible_on_front' => true</code><br> How does Magento store this value?",
    options: ["In catalog_eav_attribute table, is_visible_on_front field.", "In eav_attribute table, visible_on_front field.", "In catalog_product_entity_attribute table all attributes' properties are saved as serialized array in the attribute_data field.", "In a special json file located in var/view_preprocessing/."],
    answers: ["In catalog_eav_attribute table, is_visible_on_front field."],
    explanation: "",
  },
  {
    question: "You have to modify DB Schema for a third-party module. This module is quite old and uses the PHP scripts found in its setup directory. You want to do changes on existing tables using a Declarative Schema approach.After running <code>bin/magento setup:upgrade</code> you got the error: Foreign key not found... How you would solve the above error? (Choose 2)",
    options: ["Add a referenced primary key to declarative approach as well and leave standard script unchanged.", "Magento 2 does not recognize mixing of standard and declarative approaches in scope of FOREIGN and PRIMARY keys.", "Remove the primary key referenced from Standard script and move it to declarative approach as well.", "Move the related changes to use a standard approach instead of a declarative approach.","Add a missing required FOREIGN_KEY and its INDEX."],
    answers: ["Magento 2 does not recognize mixing of standard and declarative approaches in scope of FOREIGN and PRIMARY keys.", "Remove the primary key referenced from Standard script and move it to declarative approach as well."],
    explanation: "",
  },
  {
    question: "You are developing a module and need to add another column to a table introduced by another module MyCompany_MyModule via db schema. How do you do that?",
    options: ["Create a <code>etc/db_schema.xml</code> file in your module, add the column and run <code>bin/magento setup:upgrade</code>", "Create a <code>etc/db.xml</code> file in your module, add the column and run <code>bin/magento setup:db-schema:upgrade</code>", "Run a command: <code>bin/magento setup:db-schema:upgrade <table> <column definition></code>", "Create a <code>etc/db_schema_whitelist.json</code> file in your module, add the column and run <code>bin/magento setup:upgrade</code>"],
    answers: ["Run a command: <code>bin/magento setup:db-schema:upgrade <table> <column definition></code>"],
    explanation: "",
  },
  {
    question: "You're managing a Magento 2 site where a critical security update has been released for ottersafe/module-security, bringing it to version 2.0.0. However, some existing modules rely on version 1.5.0 and aren't yet compatible with the latest release.<br>What approach should you take to implement the security upgrade while awaiting compatibility updates for the other modules?",
    options: ["Use a patch (or patches) to apply the relevant security updates individually to 1.5.0.", "Utilize Composer's inline aliasing to install the latest version as if it were the older one<br><code>composer require ottersafe/module-security '2.0.0 as 1.5.0'</code>", "Temporarily ignore version conflicts and install the latest version 2.0.0 of ottersafe/module-security directly: <code>composer require ottersafe/module-security:^2 --ignore- platform-reqs</code>"],
    answers: ["Use a patch (or patches) to apply the relevant security updates individually to 1.5.0."],
    explanation: 'If the module update entails just a small code change, a patch can be a great approach. But if not, or, if there is not a detailed changelog, using a composer inline alias is the quickest and best approach. <a href="https://www.linkedin.com/posts/maxwelljoseph_swiftotter-magento-magentodeveloper-activity-7198910468046901248-g7e-" target="_blank" rel="noopener noreferrer">Reference 1</a> <a href="https://www.linkedin.com/posts/maxwelljoseph_swiftotter-magento-magento2-activity-7199437733390344192-dT3M" target="_blank" rel="noopener noreferrer">Reference 2</a>',
  },
  {
    question: "You are given the task of uninstalling an extension from a Magento 2 website. This extension does not use the whitelist methodology, instead relying on setup scripts. After using the <code>bin/magento module:uninstall MyCompany_MyModule</code> command, you observe that the module is removed from the system. However, the database table related to the module still remains in the database.",
    options: ["You must manually delete it from the database.", "You need to use the <code>-remove-data</code> flag and the module must have an Uninstall class that cleans up the database.", "The module is still in use by another extension. Before removing the table, you must disable all dependent extensions and then re-run the uninstall command."],
    answers: ["You need to use the <code>-remove-data</code> flag and the module must have an Uninstall class that cleans up the database."],
    explanation: '▪ When module: uninstall is called: Setup\\Uninstall.php is run. DB Schema entities/patches are left.<br>▪ When module: disable is called: Setup\\Uninstall.php is ignored. DB Schema entities/patches are removed. <br>Thus, be very careful of disabling a module with DB Schema. If you need to remove a module, disable first, deploy to production, then uninstall it. <a href="https://www.linkedin.com/posts/maxwelljoseph_swiftotter-magento-magentodeveloper-activity-7115198918312816640-DwRL" target="_blank" rel="noopener noreferrer">Reference 1</a> <a href="https://youtu.be/j1AmYIVySSY" target="_blank" rel="noopener noreferrer">Reference 2</a>',
  },
  {
    question: "You are working on the Magento 2 module on your development machine. You have created a data patch inside <code>MyModule/Setup/Patch/Data/MyPatch.php</code> to insert default data into the module-specific table. After making the changes, you found a mistake in the data. You updated the patch and ran the setup:upgrade command, but the data is still not modified in the tables. <br> How do you solve this problem?",
    options: ["The <code>whitelist.json</code> file needs to be updated.","The module version needs to be incremented in the <code>setup_module</code> table.","You need to delete entry in the <code>patch_list</code> table to make the patch work again."],
    answers: ["You need to delete entry in the <code>patch_list</code> table to make the patch work again."],
    explanation: 'Once patch is executed it will be added to <code>patch_list</code> table so magento will not run the same patch again on next upgrades, if we want to execute same patch again, then we need to delete the entry from <code>patch_list</code> table by patch name, and then run <code>setup:upgrade</code> <a href="https://www.linkedin.com/posts/maxwelljoseph_swiftotter-magento-magentodeveloper-activity-7089831761332891648-0D3x" target="_blank" rel="noopener noreferrer">Reference</a>'
  },
  {
    question: "An Adobe Commerce Developer is tasked with extending functionality of an existing third party module that is already installed.The module creates a table using an <code>InstallSchema.php</code> script and the developer would like to rename a column in the table.<br> Keeping the best practices in mind, how would the developer rename column in this table ?",
    options: ["Create a db_schema.xml file to add a new column with the <code>onCreate=\"migrateDataFrom(old_column)\"</code> attribute on the column node.","Create an UpgradeSchema.php script to rename the column using the changeColumn() method on the connection.","Create a Schema Patch and implement the apply() method to rename the column using the changeColumn() method."],
    answers: ["Create a Schema Patch and implement the apply() method to rename the column using the changeColumn() method."],
    explanation: ""
  },
  {
    question: "An Adobe Commerce developer is training a junior developer on their team and is explaining how Data and Schema patches work. While investigating an example patch from the Adobe Commerce dev docs, the junior developer asks what the purpose of the startSetup and endSetup calls are from this method:<br><code>&lt;?php<br>public function apply() {<br>$this->moduleDataSetup->getConnection()->startSetup();<br><br>// The code that you want apply in the patch<br>$this->moduleDataSetup->getConnection()->endSetup();<br>}</code><br>Which two statements are true regarding the purpose of these methods? (Choose two.)",
    options: [
      "startSetup sets the sql_mode system variable to <code>NO_AUTO_VALUE_ON_ZERO</code> and endSetup sets it back to '*'.",
      "startSetup halts any running indexes or cron tasks to ensure the subsequent process is not interfered with and endSetup re-triggers them.",
      "startSetup sets the connect_timeout system variable to 600 (i.e., 10 minutes) to avoid lost connections for complex actions and endSetup returns it to the default.",
      "startSetup sets the <code>foreign_key_checks</code> system variable to 0 and endSetup sets it back to 1."
    ],
    answers:[
      "startSetup sets the sql_mode system variable to NO_AUTO_VALUE_ON_ZERO and endSetup sets it back to '*'.",
      "startSetup sets the <code>foreign_key_checks</code> system variable to 0 and endSetup sets it back to 1."
    ],
  },
  {
    question: "Data patch <code>MyVendor\\CategoryRecommendations\\Setup\\Patch\\Data\\UpdateCategoryRecommendation</code> has a dependency on <code>MyVendor\\ProductRecommendations\\Setup\\Patch\\Data\\UpdateProductRecommendation.</code><br><br><code>&lt;?php<br>namespace MyVendor\\CategoryRecommendations\\Setup\\Patch\\Data;<br>class UpdateCategoryRecommendation<br>{<br>public static function getDependencies(): array<br>{<br>    return [MyVendor\\ProductRecommendations\\Setup\\Patch\\Data\\UpdateProductRecommendation::class];<br>}<br>}<br></code>The module <code>MyVendor\\ProductRecommendation</code> is disabled and the `UpdateProductRecommendation` has not yet been applied. What would be the result of the command <code>bin/magento setup:upgrade</code> ?",
    options: [
      "It will raise an error when applying `UpdateCategoryRecommendation` as it depends on a not applied patch from a disabled module.",
      "Only `UpdateCategoryRecommendation` will be applied, as dependencies from disabled module are skipped.",
      "Both patches `UpdateProductRecommendation` and `UpdateCategoryRecommendation` are applied."
    ],
    answers: ["Both patches `UpdateProductRecommendation` and `UpdateCategoryRecommendation` are applied."]
  },
  {
    "question": "Which statements are true about reverting a data patch? (Select Two)",
    "options": [
      "You cannot revert a particular data patch, you will have to add another data patch with data removal code.",
      "<code>bin/magento module:uninstall Vendor_ModuleName</code>, this command will remove all data patches from that module even if no relevant revert() code is present.",
      "Run this command to revert all non-composer installed data patches from specific module: <code>bin/magento module:uninstall --non-composer Vendor_ModuleName</code>",
      "Following command will disable the module as well as remove all data patches from that module: <code>bin/magento module:disable Vendor_ModuleName</code>"
    ],
    "answers": [
      "You cannot revert a particular data patch, you will have to add another data patch with data removal code.",
      "Run the following command to revert all non-composer installed data patches from specific module: <code>bin/magento module:uninstall --non-composer Vendor_ModuleName</code>"
    ]
  }
];
function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const correctAnswers = questions[currentQuestionIndex]?.answers || [];

  useEffect(() => {
    setQuestions(shuffleQuestions());
  }, []);

  const shuffleQuestions = () => {
    const shuffledQuestions = questionsData.map((q) => ({
      ...q,
      options: q.options.sort(() => Math.random() - 0.5),
    }));
    return shuffledQuestions.sort(() => Math.random() - 0.5);
  };

  const handleOptionClick = (option) => {
    if (showAnswer) return; // Do nothing if the answer is already revealed

    const correctAnswerCount = questions[currentQuestionIndex]?.answers.length;
    if (correctAnswerCount === 1) { // If the question has only one correct answer, select one option
      if (selectedAnswers.includes(option)) {
        setSelectedAnswers((prev) => prev.filter((ans) => ans !== option)); // Unselect if already selected
      } else {
        setSelectedAnswers([option]); // Only one answer can be selected
      }
    } else if (correctAnswerCount > 1) { // If the question allows multiple correct answers, allow up to 2
      if (selectedAnswers.includes(option)) {
        setSelectedAnswers((prev) => prev.filter((ans) => ans !== option)); // Unselect if already selected
      } else {
        if (selectedAnswers.length < 2) {
          setSelectedAnswers((prev) => [...prev, option]); // Add answer if under limit
        }
      }
    }
  };
  const handleRetakeQuiz = () => {
      setQuestions(shuffleQuestions());
      setCurrentQuestionIndex(0);
      setShowAnswer(false);
      setQuizComplete(false);
      setScore(0);
      setQuizStarted(false);
  };
  const handleNextQuestion = () => {
    // Check if the selected answers are correct
    if (isCorrect()) {
      setScore(score + 1);
    }

    // Move to the next question or complete the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]); // Reset selected answers
      setShowAnswer(false);
    } else {
      setQuizComplete(true);
    }
  };
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };
  const handleSubmit = () => {
    setShowAnswer(true);
  };

  const isCorrect = () => {
    return (
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer))
    );
  };

  if (!quizStarted) {
    return (
       <Container className="quizContainer">
        <Card className="welcome-card">
          <Card.Body>
            <Card.Title className="welcome-title">Welcome to the Magento Quiz!</Card.Title>
            <Card.Text className="welcome-text">
              Do you know everything about Magento's Database changes & upgrades? Let's find out!
            </Card.Text>
            <Card.Text>This quiz contains {questions.length} questions. Are you ready?</Card.Text>
            <Button variant="success" size="lg" onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (quizComplete) {
    const scorePercent = (score / questions.length) * 100;
    return (
     <Container className="quizContainer">
        <Card className="complete-card">
          <Card.Body>
            <Card.Title className="complete-title">Quiz Complete!</Card.Title>
            <Card.Text className="score-text">
              {scorePercent <= 25 ? "😔" : scorePercent <= 50 ? "😐" : scorePercent <= 75 ? "🙂" : "🎉"} Your score: <span className="score">{score}/{questions.length}</span>{" "}
              {scorePercent <= 25 ? "😔" : scorePercent <= 50 ? "😐" : scorePercent <= 75 ? "🙂" : "🎉"}
            </Card.Text>
            <Button variant="light" size="lg" onClick={handleRetakeQuiz}>
              Retake Quiz
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="quizContainer">
      <Card>
        <Card.Body>
          <ProgressBar
            now={(currentQuestionIndex + 1) / questions.length * 100}
            label={`${currentQuestionIndex + 1}/${questions.length}`}
            className="mt-3"
          />
          <Card.Title className="mt-3" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex]?.question }} />
          <ListGroup>
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleOptionClick(option)}
                active={selectedAnswers.includes(option)}
                disabled={showAnswer} // Disable options after answer is revealed
                dangerouslySetInnerHTML={{ __html: option }}
                style={{ cursor: "pointer" }}
              />
            ))}
          </ListGroup>
          {showAnswer && (
            <Alert
              variant={isCorrect() ? "success" : "danger"}
              className="mt-3"
            >
              {isCorrect() ? "Correct!" : `Incorrect.`}
              <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex]?.explanation }} />
            </Alert>
          )}
          {!showAnswer && <Button onClick={handleSubmit} className="mt-3 mr-2">Submit</Button>}
          {showAnswer && (
            <Button className="mt-3" onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default QuizApp;