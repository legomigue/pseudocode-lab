import { Question, ScrambledLine } from '../types/questions';

export interface ValidationResult {
  isCorrect: boolean;
  scorePercentage: number;
  whatWasCorrect: string;
  mistakeExplanation?: string;
  hint?: string;
  detailedChecks?: { label: string; passed: boolean; feedback: string }[];
}

export const validatorService = {
  // Exercise A: Multiple Choice
  validateMultipleChoice(question: Question, selectedOptionId: string): ValidationResult {
    const isCorrect = selectedOptionId === question.correctOptionId;
    if (isCorrect) {
      return {
        isCorrect: true,
        scorePercentage: 100,
        whatWasCorrect: 'You selected the exact correct definition matching standard pseudocode principles.',
        hint: undefined
      };
    }

    const selectedOption = question.options?.find(o => o.id === selectedOptionId);
    return {
      isCorrect: false,
      scorePercentage: 0,
      whatWasCorrect: 'You attempted this question. Reviewing definitions helps strengthen algorithmic vocabulary.',
      mistakeExplanation: `"${selectedOption?.text}" is not the standard role for this construct.`,
      hint: question.hints[0] || 'Re-read the question carefully and focus on how data is handled.'
    };
  },

  // Exercise B: Complete the Pseudocode
  validateBlanks(question: Question, userAnswers: Record<string, string>): ValidationResult {
    if (!question.expectedBlanks) {
      return { isCorrect: false, scorePercentage: 0, whatWasCorrect: '' };
    }

    const checks: { label: string; passed: boolean; feedback: string }[] = [];
    let correctCount = 0;
    const totalBlanks = Object.keys(question.expectedBlanks).length;

    Object.entries(question.expectedBlanks).forEach(([blankKey, acceptedValues], index) => {
      const userValue = (userAnswers[blankKey] || '').trim().toUpperCase();
      const passed = acceptedValues.some(val => val.trim().toUpperCase() === userValue);

      if (passed) {
        correctCount += 1;
        checks.push({
          label: `Blank ${index + 1}`,
          passed: true,
          feedback: `Correct keyword "${userValue}" used.`
        });
      } else {
        checks.push({
          label: `Blank ${index + 1}`,
          passed: false,
          feedback: userValue ? `"${userValue}" is not the expected keyword here.` : 'This blank was left empty.'
        });
      }
    });

    const isCorrect = correctCount === totalBlanks;
    const scorePercentage = Math.round((correctCount / totalBlanks) * 100);

    return {
      isCorrect,
      scorePercentage,
      whatWasCorrect: correctCount > 0 
        ? `You correctly identified ${correctCount} out of ${totalBlanks} missing instructions.` 
        : 'Good effort attempting to fill in the algorithm.',
      mistakeExplanation: !isCorrect 
        ? `Review the incorrect blanks. Ensure keyword syntax and logic match standard conventions.` 
        : undefined,
      hint: !isCorrect ? question.hints[0] : undefined,
      detailedChecks: checks
    };
  },

  // Exercise C: Find the Mistake
  validateMistake(question: Question, selectedLineNumber: number): ValidationResult {
    const isCorrect = selectedLineNumber === question.errorLineNumber;
    if (isCorrect) {
      return {
        isCorrect: true,
        scorePercentage: 100,
        whatWasCorrect: `Excellent diagnosis! Line ${selectedLineNumber} contains the critical logical error.`,
        mistakeExplanation: undefined
      };
    }

    return {
      isCorrect: false,
      scorePercentage: 0,
      whatWasCorrect: `Line ${selectedLineNumber} is actually syntactically and logically valid within this algorithm.`,
      mistakeExplanation: `Look closely for condition boundaries, variable initialisation, or loop termination checks.`,
      hint: question.hints[0] || 'Trace the variables through the first iteration.'
    };
  },

  // Exercise D: Arrange Instructions
  validateOrdering(question: Question, currentOrder: ScrambledLine[]): ValidationResult {
    if (!question.correctOrderIds) {
      return { isCorrect: false, scorePercentage: 0, whatWasCorrect: '' };
    }

    const currentIds = currentOrder.map(item => item.id);
    const correctIds = question.correctOrderIds;
    let matchedPositions = 0;

    const checks: { label: string; passed: boolean; feedback: string }[] = [];

    currentIds.forEach((id, index) => {
      const correctIdAtIndex = correctIds[index];
      const isMatch = id === correctIdAtIndex;
      if (isMatch) {
        matchedPositions += 1;
      }
      const lineText = currentOrder[index].text;
      checks.push({
        label: `Position ${index + 1}`,
        passed: isMatch,
        feedback: isMatch ? `"${lineText}" is in the correct position.` : `"${lineText}" is not yet in the right sequence.`
      });
    });

    const isCorrect = matchedPositions === correctIds.length;
    const scorePercentage = Math.round((matchedPositions / correctIds.length) * 100);

    return {
      isCorrect,
      scorePercentage,
      whatWasCorrect: matchedPositions > 0 
        ? `${matchedPositions} of ${correctIds.length} instructions are correctly ordered.` 
        : 'You placed instructions in sequence. Keep checking prerequisite inputs.',
      mistakeExplanation: !isCorrect ? 'Remember the sequence: inputs must precede calculations, and calculations must precede outputs.' : undefined,
      hint: !isCorrect ? question.hints[0] : undefined,
      detailedChecks: checks
    };
  },

  // Exercise E: Structured Checks for Scenario Challenges
  validateScenarioAlgorithm(question: Question, code: string): ValidationResult {
    const scenario = question.scenarioDetails;
    if (!scenario) {
      return { isCorrect: false, scorePercentage: 0, whatWasCorrect: '' };
    }

    const upperCode = code.toUpperCase();
    const checks: { label: string; passed: boolean; feedback: string }[] = [];
    let passedCount = 0;

    // Check 1: Required Keywords
    scenario.requiredKeywords.forEach(kw => {
      const present = upperCode.includes(kw);
      if (present) {
        passedCount += 1;
        checks.push({
          label: `Keyword "${kw}"`,
          passed: true,
          feedback: `Found required structural keyword: ${kw}`
        });
      } else {
        checks.push({
          label: `Keyword "${kw}"`,
          passed: false,
          feedback: `Missing required keyword: ${kw}`
        });
      }
    });

    // Check 2: Loop pairing (e.g. WHILE requires ENDWHILE, FOR requires NEXT or ENDFOR)
    if (upperCode.includes('WHILE')) {
      const hasEndWhile = upperCode.includes('ENDWHILE') || upperCode.includes('END WHILE');
      checks.push({
        label: 'Loop Termination (ENDWHILE)',
        passed: hasEndWhile,
        feedback: hasEndWhile ? 'WHILE loop has matching termination block.' : 'WHILE block is missing matching ENDWHILE terminator.'
      });
      if (hasEndWhile) passedCount += 1;
    }

    // Check 3: Selection pairing (IF requires ENDIF)
    if (upperCode.includes('IF')) {
      const hasEndIf = upperCode.includes('ENDIF') || upperCode.includes('END IF');
      checks.push({
        label: 'Selection Termination (ENDIF)',
        passed: hasEndIf,
        feedback: hasEndIf ? 'IF block has matching ENDIF terminator.' : 'IF block is missing matching ENDIF terminator.'
      });
      if (hasEndIf) passedCount += 1;
    }

    const totalChecks = checks.length;
    const scorePercentage = Math.round((passedCount / totalChecks) * 100);
    const isSatisfactory = scorePercentage >= 80;

    return {
      isCorrect: isSatisfactory,
      scorePercentage,
      whatWasCorrect: `Your algorithm implements ${passedCount} of ${totalChecks} structural algorithmic requirements.`,
      mistakeExplanation: !isSatisfactory 
        ? 'Some expected algorithmic constructs or termination blocks were missing. Check the criteria list below.' 
        : undefined,
      hint: 'Compare your logic with the Self-Assessment Marking Scheme and Model Solution provided.',
      detailedChecks: checks
    };
  }
};
