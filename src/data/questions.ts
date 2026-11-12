import { Question, TopicId, TopicInfo } from '../types/questions';

export const TOPICS: TopicInfo[] = [
  {
    id: 'variables-io',
    name: 'Variables, Input & Output',
    description: 'Receiving inputs, storing values, performing calculations, and displaying formatted output.',
    difficultyLevel: 1,
    iconName: 'Terminal'
  },
  {
    id: 'selection',
    name: 'Selection (IF / ELSE)',
    description: 'Branching execution based on boolean comparisons, relational operators, and nested conditions.',
    difficultyLevel: 2,
    iconName: 'GitBranch'
  },
  {
    id: 'iteration',
    name: 'Iteration (Loops)',
    description: 'Definite (FOR) and indefinite (WHILE, REPEAT) iteration for repetitive algorithmic tasks.',
    difficultyLevel: 2,
    iconName: 'Repeat'
  },
  {
    id: 'counters-accumulators',
    name: 'Counters & Accumulators',
    description: 'Tracking item quantities, calculating running totals, averages, and loop indices.',
    difficultyLevel: 2,
    iconName: 'Hash'
  },
  {
    id: 'arrays',
    name: 'Data Structures & Arrays',
    description: 'Storing ordered collections, index positioning, sequential traversal, and element search.',
    difficultyLevel: 3,
    iconName: 'Layers'
  },
  {
    id: 'trace-tables',
    name: 'Trace Tables & Desk Checking',
    description: 'Executing algorithms manually step-by-step to record variable changes and verify outputs.',
    difficultyLevel: 2,
    iconName: 'Table'
  },
  {
    id: 'errors-debugging',
    name: 'Errors & Debugging',
    description: 'Identifying and fixing syntax, logic, and run-time errors in pseudocode algorithms.',
    difficultyLevel: 2,
    iconName: 'Bug'
  },
  {
    id: 'algorithms-scenarios',
    name: 'Scenario Challenges',
    description: 'Complex multi-step exam-style scenarios combining selection, iteration, and data processing.',
    difficultyLevel: 3,
    iconName: 'FileCode'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // --- LEVEL 1: BEGINNER ---
  {
    id: 'mcq-101',
    title: 'Purpose of Variables in Pseudocode',
    topic: 'variables-io',
    difficulty: 1,
    type: 'multiple-choice',
    prompt: 'In pseudocode, which of the following best describes the primary function of a variable?',
    learningObjective: 'Understand how memory locations and named variables are defined and used in algorithms.',
    pseudocodeRuleRef: 'Core Principles: Data storage and identifier naming',
    conventionStatus: 'generic_demo',
    pearsonNotice: 'Baseline UK Computing convention. Exact identifier rules subject to Pearson BTEC Unit 1 specification.',
    hints: [
      'Think about where an algorithm temporarily stores information provided by the user.',
      'Variables have identifiers (names) and can change their stored value during execution.'
    ],
    explanation: 'A variable is a named storage location in memory that holds a data value which can change or be modified during the execution of an algorithm.',
    options: [
      { id: 'opt_a', text: 'A named storage location whose value can change during algorithm execution.' },
      { id: 'opt_b', text: 'A fixed command that terminates the program immediately.' },
      { id: 'opt_c', text: 'A comment line written purely for human readers that the computer ignores.' },
      { id: 'opt_d', text: 'A hardware component that prints text onto paper.' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    id: 'mcq-102',
    title: 'Input and Output Distinction',
    topic: 'variables-io',
    difficulty: 1,
    type: 'multiple-choice',
    prompt: 'Consider the instructions INPUT userAge and OUTPUT "Welcome". What is the difference between these two operations?',
    learningObjective: 'Differentiate between data ingress (user input) and egress (system output).',
    pseudocodeRuleRef: 'I/O Operations: INPUT vs OUTPUT keywords',
    conventionStatus: 'generic_demo',
    hints: [
      'INPUT gathers information from an external source (like a keyboard).',
      'OUTPUT transmits information to the user interface or screen.'
    ],
    explanation: 'INPUT instructs the system to accept data from an external input device (e.g. keyboard), whereas OUTPUT displays messages or computed results to the user.',
    options: [
      { id: 'opt_a', text: 'INPUT reads data from the user into a variable; OUTPUT presents data or messages to the user.' },
      { id: 'opt_b', text: 'INPUT performs arithmetic; OUTPUT stores the result in an array.' },
      { id: 'opt_c', text: 'Both instructions perform identical operations and can be used interchangeably.' },
      { id: 'opt_d', text: 'INPUT terminates a loop; OUTPUT starts a loop.' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    id: 'complete-101',
    title: 'Calculate Perimeter of a Rectangle',
    topic: 'variables-io',
    difficulty: 1,
    type: 'complete-code',
    prompt: 'Complete the missing pseudocode instructions to read the length and width of a rectangle, compute its perimeter, and display the result.',
    learningObjective: 'Construct linear algorithms with sequential input, calculation, and output.',
    pseudocodeRuleRef: 'Sequential Processing & Arithmetic Operations',
    conventionStatus: 'generic_demo',
    hints: [
      'Look at the blank on line 1: we need to receive the length from the user.',
      'Look at line 4: we need to display the calculated result to the user.'
    ],
    explanation: 'The standard sequential pattern is: 1) INPUT variables, 2) Calculate result with SET/assignment, 3) OUTPUT the final result.',
    blankTemplate: `___blank_1___ rectLength
INPUT rectWidth
SET perimeter = (rectLength + rectWidth) * 2
___blank_2___ "The perimeter is: ", perimeter`,
    expectedBlanks: {
      blank_1: ['INPUT', 'READ', 'RECEIVE'],
      blank_2: ['OUTPUT', 'PRINT', 'DISPLAY']
    }
  },
  {
    id: 'arrange-101',
    title: 'Calculate Discounted Price',
    topic: 'variables-io',
    difficulty: 1,
    type: 'arrange-instructions',
    prompt: 'Arrange the scrambled instructions into the correct logical sequence to calculate the final price after applying a 10% discount.',
    learningObjective: 'Sequence instructions in logical algorithmic order.',
    pseudocodeRuleRef: 'Linear Execution Ordering',
    conventionStatus: 'generic_demo',
    hints: [
      'You cannot calculate a discount on a price before you have received the original price.',
      'Always calculate the final price before outputting it.'
    ],
    explanation: 'The logical order must follow: 1. Input original price -> 2. Calculate discount amount -> 3. Deduct discount from price -> 4. Output final price.',
    scrambledLines: [
      { id: 'line_1', text: 'OUTPUT "Final discounted price is £", finalPrice' },
      { id: 'line_2', text: 'INPUT originalPrice' },
      { id: 'line_3', text: 'SET discount = originalPrice * 0.10' },
      { id: 'line_4', text: 'SET finalPrice = originalPrice - discount' }
    ],
    correctOrderIds: ['line_2', 'line_3', 'line_4', 'line_1']
  },

  // --- LEVEL 2: INTERMEDIATE ---
  {
    id: 'mcq-201',
    title: 'Role of a Counter in an Algorithm',
    topic: 'counters-accumulators',
    difficulty: 2,
    type: 'multiple-choice',
    prompt: 'What is the primary purpose of a counter variable in an iterative algorithm?',
    learningObjective: 'Distinguish between counters (frequency/iterations) and accumulators (running totals).',
    pseudocodeRuleRef: 'Iteration Constructs: Variable roles in loops',
    conventionStatus: 'generic_demo',
    hints: [
      'A counter usually increments by a fixed step, usually 1.',
      'Contrast this with an accumulator, which adds varying data amounts.'
    ],
    explanation: 'A counter is used to track the number of times an event occurs or how many loop iterations have been executed, usually incrementing by 1 (e.g. SET count = count + 1). An accumulator adds varying quantities to calculate a running total.',
    options: [
      { id: 'opt_a', text: 'To record the number of iterations or how many times a condition is met, typically incrementing by 1.' },
      { id: 'opt_b', text: 'To accumulate varying numeric values to calculate a final sum.' },
      { id: 'opt_c', text: 'To convert strings into floating-point numbers automatically.' },
      { id: 'opt_d', text: 'To pause the algorithm until user input is received.' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    id: 'find-mistake-201',
    title: 'Off-By-One or Inverted Loop Condition',
    topic: 'iteration',
    difficulty: 2,
    type: 'find-mistake',
    prompt: 'An algorithm is intended to ask the user to enter 5 test marks and sum them up. Identify the line containing a logical error.',
    learningObjective: 'Analyse iteration loop conditions and identify infinite loops or termination bugs.',
    pseudocodeRuleRef: 'Indefinite vs Definite Iteration: WHILE termination checks',
    conventionStatus: 'generic_demo',
    codeSnippet: `1: SET total = 0
2: SET count = 1
3: WHILE count > 5 DO
4:   INPUT mark
5:   SET total = total + mark
6:   SET count = count + 1
7: ENDWHILE
8: OUTPUT "Sum of marks is: ", total`,
    errorLineNumber: 3,
    identifiedMistakeExplanation: 'Line 3 has an inverted condition: "WHILE count > 5 DO". Because count starts at 1, the condition (1 > 5) evaluates to FALSE immediately on the very first check, so the loop body never executes at all! It should be "WHILE count <= 5 DO".',
    hints: [
      'Look closely at line 2 and line 3: what is count initialised to, and what does the WHILE condition check?',
      'Will the loop body ever execute if count starts at 1?'
    ],
    explanation: 'The loop condition is inverted. If count is 1 and the condition is "count > 5", the condition is false immediately, skipping lines 4-6 completely. It should be "WHILE count <= 5 DO".'
  },
  {
    id: 'complete-201',
    title: 'Cinema Ticket Age Eligibility',
    topic: 'selection',
    difficulty: 2,
    type: 'complete-code',
    prompt: 'Fill in the missing pseudocode keywords to complete the selection construct that checks if a customer is eligible for a senior discount (age 65 or above) or a child ticket (under 16).',
    learningObjective: 'Implement multi-way selection using IF..THEN..ELSE statements.',
    pseudocodeRuleRef: 'Selection Constructs: Multi-branch decision structures',
    conventionStatus: 'generic_demo',
    hints: [
      'Line 2 begins the true branch if the condition is satisfied.',
      'Line 4 introduces an alternative condition if the first was false.',
      'Line 8 closes the selection construct.'
    ],
    explanation: 'Standard multi-branch selection uses IF condition THEN ... ELSE ... ENDIF.',
    blankTemplate: `INPUT customerAge
IF customerAge >= 65 ___blank_1___
  OUTPUT "Senior Citizen Discount Applied"
___blank_2___ customerAge < 16 THEN
  OUTPUT "Child Rate Applied"
ELSE
  OUTPUT "Standard Adult Rate Applied"
___blank_3___`,
    expectedBlanks: {
      blank_1: ['THEN'],
      blank_2: ['ELSE IF', 'ELSEIF', 'ELIF'],
      blank_3: ['ENDIF', 'END IF']
    }
  },
  {
    id: 'arrange-201',
    title: 'Validation Loop for Positive Integer',
    topic: 'iteration',
    difficulty: 2,
    type: 'arrange-instructions',
    prompt: 'Arrange the pseudocode lines to create a post-test or pre-test validation loop that prompts the user repeatedly until they enter a positive number (> 0).',
    learningObjective: 'Construct validation routines using indefinite iteration loops.',
    pseudocodeRuleRef: 'Data Validation Patterns',
    conventionStatus: 'generic_demo',
    hints: [
      'First prompt and receive the initial number from the user.',
      'The loop should continue only as long as the entered number is invalid (<= 0).'
    ],
    explanation: 'Standard input validation prompts first, then enters a WHILE loop checking if the input is invalid (<= 0), prompting for a re-entry within the loop until valid.',
    scrambledLines: [
      { id: 'line_1', text: 'OUTPUT "Number accepted: ", userNumber' },
      { id: 'line_2', text: 'INPUT userNumber' },
      { id: 'line_3', text: 'OUTPUT "Invalid entry. Please enter a positive number:"' },
      { id: 'line_4', text: 'OUTPUT "Please enter a positive number greater than 0:"' },
      { id: 'line_5', text: 'WHILE userNumber <= 0 DO' },
      { id: 'line_6', text: 'ENDWHILE' },
      { id: 'line_7', text: 'INPUT userNumber' }
    ],
    correctOrderIds: ['line_4', 'line_2', 'line_5', 'line_3', 'line_7', 'line_6', 'line_1']
  },
  {
    id: 'find-mistake-202',
    title: 'Missing Counter Initialisation',
    topic: 'counters-accumulators',
    difficulty: 2,
    type: 'find-mistake',
    prompt: 'The following algorithm counts how many students passed an exam (mark >= 50). Find the line where a critical error or omission occurs.',
    learningObjective: 'Understand the essential requirement of initialising counters before loop entry.',
    pseudocodeRuleRef: 'Variable State & Initialisation Standards',
    conventionStatus: 'generic_demo',
    codeSnippet: `1: FOR studentIndex = 1 TO 30
2:   INPUT mark
3:   IF mark >= 50 THEN
4:     SET passCount = passCount + 1
5:   ENDIF
6: NEXT studentIndex
7: OUTPUT "Total passes: ", passCount`,
    errorLineNumber: 4,
    identifiedMistakeExplanation: 'passCount has never been initialised to 0 before the loop began! Attempting to add 1 to an uninitialised variable on line 4 results in undefined behavior or a run-time error.',
    hints: [
      'Look at passCount in line 4: what was its initial starting value before line 1?',
      'Variables used in arithmetic accumulation must be set to 0 before entering a loop.'
    ],
    explanation: 'Before executing a loop that increments a counter (SET passCount = passCount + 1), the counter must be initialised (e.g. SET passCount = 0 before line 1). Without this, line 4 fails because passCount has no initial value.'
  },

  // --- LEVEL 3: ADVANCED ---
  {
    id: 'mcq-301',
    title: 'Linear Search Best vs Worst Case',
    topic: 'algorithms-scenarios',
    difficulty: 3,
    type: 'multiple-choice',
    prompt: 'In a linear search algorithm traversing an array of N items, when does the best-case execution time occur?',
    learningObjective: 'Analyse algorithm efficiency and time complexity in standard searching algorithms.',
    pseudocodeRuleRef: 'Algorithm Efficiency: Searching and Sorting',
    conventionStatus: 'generic_demo',
    hints: [
      'Best case means the fewest possible comparisons are needed.',
      'Where would the target element need to be located in the array?'
    ],
    explanation: 'In a linear search, the best-case scenario occurs when the search target is located at index 0 (the very first element inspected), requiring only 1 comparison. The worst-case requires N comparisons if the item is at the end or absent.',
    options: [
      { id: 'opt_a', text: 'When the target value is found at the first position examined (Index 0 or 1).' },
      { id: 'opt_b', text: 'When the target value is located at the exact midpoint of the array.' },
      { id: 'opt_c', text: 'When the array has already been sorted in descending order.' },
      { id: 'opt_d', text: 'When the search value does not exist anywhere in the array.' }
    ],
    correctOptionId: 'opt_a'
  },
  {
    id: 'complete-301',
    title: 'Find Maximum Value in an Array',
    topic: 'arrays',
    difficulty: 3,
    type: 'complete-code',
    prompt: 'Complete the algorithm that searches an array of 5 temperatures to find and output the highest recorded temperature.',
    learningObjective: 'Implement array traversal and conditional replacement algorithms.',
    pseudocodeRuleRef: 'Data Structures: 1D Array manipulation',
    conventionStatus: 'generic_demo',
    hints: [
      'We start by setting maxTemp to the very first item in the array.',
      'We then loop through the remaining items from index 1 to the end.',
      'If the current item is greater than maxTemp, we update maxTemp.'
    ],
    explanation: 'To find the maximum in an array: 1) Initialise max to the first element (temps[0]), 2) Loop through indices 1 to N-1, 3) If temps[i] > maxTemp THEN SET maxTemp = temps[i], 4) Close loop and output.',
    blankTemplate: `SET temps = [18, 24, 29, 21, 26]
SET maxTemp = temps[0]
FOR i = 1 TO 4
  IF temps[i] > maxTemp THEN
    SET maxTemp = ___blank_1___
  ___blank_2___
NEXT i
OUTPUT "Maximum temperature recorded: ", maxTemp`,
    expectedBlanks: {
      blank_1: ['temps[i]', 'temps[ i ]'],
      blank_2: ['ENDIF', 'END IF']
    }
  },
  {
    id: 'scenario-301',
    title: 'Supermarket Checkout Total with Loyalty Discount',
    topic: 'algorithms-scenarios',
    difficulty: 3,
    type: 'scenario-challenge',
    prompt: 'Write an algorithm for a supermarket checkout system that processes multiple items, calculates running totals, applies discount rules, and displays an itemised receipt summary.',
    learningObjective: 'Synthesise selection, iteration, accumulator variables, and formatted output in an exam-style scenario.',
    pseudocodeRuleRef: 'Unit 1 / Scenario Algorithmic Problem Solving',
    conventionStatus: 'generic_demo',
    hints: [
      'Initialise totalCost and itemCount to 0.',
      'Use a WHILE loop that continues asking for item price until the cashier enters -1 (sentinel value).',
      'Inside the loop, accumulate totalCost and increment itemCount.',
      'After the loop, check if totalCost is £50 or more; if so, apply a 10% discount.',
      'Output the final bill.'
    ],
    explanation: 'This problem requires an accumulator (totalCost), a counter (itemCount), sentinel-controlled iteration (WHILE price != -1), selection for discount threshold (IF totalCost >= 50), and clear output.',
    scenarioDetails: {
      problemStatement: `A supermarket checkout system requires an algorithm to process customer purchases:
1. Repeatedly ask the cashier to enter the price of an item until they enter -1 to indicate checkout completion.
2. If the price entered is valid (greater than 0), add it to the running total and increase the count of items purchased.
3. Once all items are entered, if the total cost is £50 or greater, apply a 10% loyalty discount.
4. Display the total number of items purchased and the final payable amount.`,
      inputDescription: 'Item prices entered sequentially as real numbers; -1 terminates input.',
      outputDescription: 'Total count of items and the final amount due to 2 decimal places.',
      constraints: [
        'Invalid prices <= 0 (other than the sentinel -1) must not be added to the total.',
        'Initialise accumulators and counters before any input.'
      ],
      starterCode: `SET totalCost = 0
SET itemCount = 0
INPUT itemPrice

WHILE itemPrice != -1 DO
  // Add validation, accumulation and counter logic here
  
  INPUT itemPrice
ENDWHILE

// Apply discount and display summary`,
      requiredKeywords: ['SET', 'INPUT', 'WHILE', 'IF', 'OUTPUT', 'ENDWHILE', 'ENDIF'],
      modelSolution: `SET totalCost = 0
SET itemCount = 0

INPUT itemPrice

WHILE itemPrice != -1 DO
  IF itemPrice > 0 THEN
    SET totalCost = totalCost + itemPrice
    SET itemCount = itemCount + 1
  ELSE
    OUTPUT "Invalid price ignored."
  ENDIF
  INPUT itemPrice
ENDWHILE

IF totalCost >= 50.00 THEN
  SET discount = totalCost * 0.10
  SET finalPayable = totalCost - discount
  OUTPUT "10% Loyalty discount applied: -£", discount
ELSE
  SET finalPayable = totalCost
ENDIF

OUTPUT "Total items purchased: ", itemCount
OUTPUT "Final amount payable: £", finalPayable`,
      selfAssessmentCriteria: [
        { id: 'crit_1', criterion: 'Initialises totalCost and itemCount to 0 before the loop (1 mark)', marks: 1 },
        { id: 'crit_2', criterion: 'Uses a sentinel-controlled loop checking for itemPrice != -1 (1 mark)', marks: 1 },
        { id: 'crit_3', criterion: 'Validates that itemPrice > 0 before updating running total and counter (1 mark)', marks: 1 },
        { id: 'crit_4', criterion: 'Prompts for subsequent itemPrice within the loop to avoid infinite execution (1 mark)', marks: 1 },
        { id: 'crit_5', criterion: 'Correctly tests if totalCost >= 50 and calculates the 10% discount (1 mark)', marks: 1 },
        { id: 'crit_6', criterion: 'Displays both the item count and the final payable total to the user (1 mark)', marks: 1 }
      ]
    }
  },
  {
    id: 'scenario-302',
    title: 'Student Grade Classifier & Cohort Statistics',
    topic: 'algorithms-scenarios',
    difficulty: 3,
    type: 'scenario-challenge',
    prompt: 'Construct an algorithm to process exam marks for a class of 20 students, classifying each into Distintion, Merit, Pass, or Fail, and reporting cohort statistics.',
    learningObjective: 'Implement nested selection inside definite iteration with multiple category counters.',
    pseudocodeRuleRef: 'Multi-category Classification & Summary Reporting',
    conventionStatus: 'generic_demo',
    hints: [
      'Initialise counters for distinctions, merits, passes, and fails to 0.',
      'Use a FOR loop from 1 to 20 to iterate through each student.',
      'Apply multi-branch IF..ELSEIF conditions based on boundaries: >=75 Distinction, >=60 Merit, >=50 Pass, ELSE Fail.'
    ],
    explanation: 'Definite iteration (FOR 1 TO 20) with multi-branch selection correctly categorises each student and increments the respective counter.',
    scenarioDetails: {
      problemStatement: `An assessment board requires an algorithm to process final exam marks (0-100) for a class of 20 BTEC students:
1. For each student, input their score.
2. Classify and output the student's grade:
   - 75 to 100: "Distinction"
   - 60 to 74: "Merit"
   - 50 to 59: "Pass"
   - Below 50: "Unclassified / Fail"
3. Maintain separate counters for each grade boundary.
4. After all 20 students are processed, output the total number of Distinctions and the overall Pass Rate percentage.`,
      inputDescription: '20 numeric marks between 0 and 100.',
      outputDescription: 'Individual grade classification for each student, followed by cohort summary totals.',
      requiredKeywords: ['SET', 'FOR', 'INPUT', 'IF', 'ELSE', 'OUTPUT', 'NEXT'],
      starterCode: `SET distinctionCount = 0
SET meritCount = 0
SET passCount = 0
SET failCount = 0

FOR studentNum = 1 TO 20
  // Receive mark and classify
NEXT studentNum

// Output summary`,
      modelSolution: `SET distinctionCount = 0
SET meritCount = 0
SET passCount = 0
SET failCount = 0

FOR studentNum = 1 TO 20
  INPUT mark
  IF mark >= 75 THEN
    OUTPUT "Student ", studentNum, ": Distinction"
    SET distinctionCount = distinctionCount + 1
  ELSE IF mark >= 60 THEN
    OUTPUT "Student ", studentNum, ": Merit"
    SET meritCount = meritCount + 1
  ELSE IF mark >= 50 THEN
    OUTPUT "Student ", studentNum, ": Pass"
    SET passCount = passCount + 1
  ELSE
    OUTPUT "Student ", studentNum, ": Unclassified"
    SET failCount = failCount + 1
  ENDIF
NEXT studentNum

SET totalPassed = distinctionCount + meritCount + passCount
SET passPercentage = (totalPassed / 20) * 100

OUTPUT "Total Distinctions: ", distinctionCount
OUTPUT "Overall Pass Rate: ", passPercentage, "%"`,
      selfAssessmentCriteria: [
        { id: 'crit_1', criterion: 'Initialises category counters (distinctions, merits, passes, fails) to 0 before the loop (1 mark)', marks: 1 },
        { id: 'crit_2', criterion: 'Uses a FOR loop from 1 TO 20 to iterate over all 20 students (1 mark)', marks: 1 },
        { id: 'crit_3', criterion: 'Correctly tests marks using descending boundaries (75, 60, 50) without boolean gaps (1 mark)', marks: 1 },
        { id: 'crit_4', criterion: 'Increments the appropriate category counter inside each branch (1 mark)', marks: 1 },
        { id: 'crit_5', criterion: 'Calculates the overall pass rate percentage ((totalPassed / 20) * 100) (1 mark)', marks: 1 },
        { id: 'crit_6', criterion: 'Outputs the final cohort summary figures clearly (1 mark)', marks: 1 }
      ]
    }
  }
];
