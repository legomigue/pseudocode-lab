export interface PseudocodeKeyword {
  keyword: string;
  category: 'io' | 'control' | 'loop' | 'operator' | 'data' | 'structure';
  description: string;
  example: string;
}

export const BASELINE_KEYWORDS: PseudocodeKeyword[] = [
  {
    keyword: 'INPUT',
    category: 'io',
    description: 'Receives user or sensor input into a variable.',
    example: 'INPUT studentAge'
  },
  {
    keyword: 'OUTPUT',
    category: 'io',
    description: 'Displays a message, variable, or calculated result.',
    example: 'OUTPUT "Total cost is £", total'
  },
  {
    keyword: 'SET',
    category: 'data',
    description: 'Initialises or assigns a value to a variable.',
    example: 'SET counter = 0'
  },
  {
    keyword: 'IF',
    category: 'control',
    description: 'Evaluates a boolean condition.',
    example: 'IF mark >= 50 THEN'
  },
  {
    keyword: 'THEN',
    category: 'control',
    description: 'Enters the true branch of a selection statement.',
    example: 'IF score >= 80 THEN OUTPUT "Pass"'
  },
  {
    keyword: 'ELSE',
    category: 'control',
    description: 'Executed when the IF condition evaluates to false.',
    example: 'ELSE OUTPUT "Try again"'
  },
  {
    keyword: 'ENDIF',
    category: 'control',
    description: 'Terminates an IF selection block.',
    example: 'ENDIF'
  },
  {
    keyword: 'FOR',
    category: 'loop',
    description: 'Definite iteration loop counting between a start and end boundary.',
    example: 'FOR i = 1 TO 10'
  },
  {
    keyword: 'TO',
    category: 'loop',
    description: 'Specifies the upper bound of a FOR loop.',
    example: 'FOR count = 1 TO 5'
  },
  {
    keyword: 'STEP',
    category: 'loop',
    description: 'Specifies the increment step in a FOR loop.',
    example: 'FOR i = 1 TO 10 STEP 2'
  },
  {
    keyword: 'NEXT',
    category: 'loop',
    description: 'Closes a FOR loop iteration and increments the loop counter.',
    example: 'NEXT i'
  },
  {
    keyword: 'ENDFOR',
    category: 'loop',
    description: 'Alternative terminator for FOR loops in some conventions.',
    example: 'ENDFOR'
  },
  {
    keyword: 'WHILE',
    category: 'loop',
    description: 'Indefinite pre-condition loop running while condition is true.',
    example: 'WHILE total < 100 DO'
  },
  {
    keyword: 'DO',
    category: 'loop',
    description: 'Begins the execution body of a WHILE loop.',
    example: 'WHILE count < 5 DO'
  },
  {
    keyword: 'ENDWHILE',
    category: 'loop',
    description: 'Terminates a WHILE loop block.',
    example: 'ENDWHILE'
  },
  {
    keyword: 'REPEAT',
    category: 'loop',
    description: 'Post-condition loop executing at least once until condition is met.',
    example: 'REPEAT'
  },
  {
    keyword: 'UNTIL',
    category: 'loop',
    description: 'Evaluates the exit condition of a REPEAT loop.',
    example: 'UNTIL userInput == "QUIT"'
  },
  {
    keyword: 'AND',
    category: 'operator',
    description: 'Logical conjunction operator.',
    example: 'IF age >= 16 AND hasID == TRUE THEN'
  },
  {
    keyword: 'OR',
    category: 'operator',
    description: 'Logical disjunction operator.',
    example: 'IF day == "Saturday" OR day == "Sunday" THEN'
  },
  {
    keyword: 'NOT',
    category: 'operator',
    description: 'Logical inversion operator.',
    example: 'IF NOT isComplete THEN'
  },
  {
    keyword: 'ARRAY',
    category: 'structure',
    description: 'Zero-indexed or 1-indexed collection of elements.',
    example: 'SET scores = [74, 82, 91, 65]'
  }
];

export const CONVENTION_NOTICE = {
  title: "Pearson BTEC Convention Alignment Notice",
  status: "GENERIC DEMONSTRATION BASELINE",
  specificationPending: true,
  summary:
    "This initial prototype uses standard UK Computing baseline pseudocode conventions (INPUT, OUTPUT, SET, IF..THEN..ELSE..ENDIF, FOR..TO..NEXT, WHILE..DO..ENDWHILE).",
  guidance:
    "To ensure complete alignment with your specific Pearson BTEC course (e.g. BTEC Level 3 Computing Unit 1 / Information Technology Unit 14), please provide the official specification or sample assessment material. PseudoCode Lab has been architected to update keyword validators, trace table styles, and marking criteria without modifying the core platform code.",
};
