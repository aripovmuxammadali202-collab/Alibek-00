import { Book, DiscussionThread, UserContact, NotificationItem, PlatformAdmin } from '../types';

export const PLATFORM_ADMINS: PlatformAdmin[] = [
  {
    id: 'admin-math-cambridge',
    name: 'Dr. Arthur Pendelton',
    title: 'Lead Mathematics Curator & Cambridge Fellow',
    specialty: 'Cambridge IGCSE, Olympiad Geometry & Calculus (Grades 5-11)',
    avatar: 'AP',
    bio: 'Former IMO (International Mathematical Olympiad) team mentor and Cambridge curriculum supervisor. Guides students across algebraic proofs, Euclidean geometry, and advanced calculus.',
    badge: 'Senior Admin · Math',
    welcomeMessage: 'Welcome to our Mathematics & IT Academy! I am your personal Mathematics administrator. Whether you are in Grade 5 tackling fractions or in Grade 11 solving differential calculus, feel free to ask me any math question directly!'
  },
  {
    id: 'admin-cs-algorithms',
    name: 'Sarah Jenkins, M.Sc.',
    title: 'Chief Computer Science Architect & Algorithmic Coach',
    specialty: 'Python, Data Structures, Algorithms & Distributed Systems (Grades 5-11)',
    avatar: 'SJ',
    bio: 'Ex-Google software engineer and youth informatics olympiad coach. Curates computer science curricula from introductory computational thinking to neural network mathematics.',
    badge: 'Senior Admin · Computer Science',
    welcomeMessage: 'Hello! I am your personal Computer Science and IT mentor. I will assist you with programming paradigms, algorithmic complexity (Big-O), code optimization, and project architecture.'
  },
  {
    id: 'admin-stem-discrete',
    name: 'Prof. Alisher Qosimov',
    title: 'Discrete Mathematics & Olympiad Chair',
    specialty: 'Number Theory, Combinatorics & AP Calculus (Grades 5-11)',
    avatar: 'AQ',
    bio: 'Mathematics professor with degrees from MIT and Cambridge. Specializes in helping secondary school students transition into competitive mathematics and pre-university STEM.',
    badge: 'Senior Admin · Discrete Math',
    welcomeMessage: 'Greetings! I oversee discrete mathematics, number theory, and advanced problem-solving tracks. Looking forward to our intellectual discussions on proofs and theorems!'
  }
];

export const INITIAL_BOOKS: Book[] = [
  // GRADE 5
  {
    id: 'math-grade5-foundations',
    title: 'Foundations of Arithmetic, Fractions & Spatial Logic',
    originalTitle: 'Grade 5 Mathematics: Cambridge Curriculum',
    author: 'Dr. Richard Rusczyk & Cambridge Faculty',
    authorBio: 'Pioneers in deep mathematical inquiry and accelerated problem-solving for secondary students.',
    subject: 'Mathematics',
    grade: 5,
    difficulty: 'Beginner',
    curriculum: 'Cambridge Primary & AoPS Foundation',
    pages: 280,
    year: 2025,
    rating: 4.95,
    coverImage: '/src/assets/images/book_english_math_1792685051986.jpg',
    description:
      'A comprehensive, proof-oriented journey into Grade 5 mathematics. Covers prime factorization, lowest common multiple (LCM), greatest common divisor (GCD), fraction decomposition, and 2D spatial area theorems with rigorous geometric demonstrations.',
    keyTheoremsAndConcepts: ['Prime Factorization', 'Fraction Equivalence', 'Perimeter & Area Theorems', 'Prime Sieve of Eratosthenes'],
    quotes: [
      '“Mathematics is not about memorizing recipes; it is about discovering why numbers behave the way they do.”',
      '“A fraction is not two numbers separated by a line; it is a single precise point on the continuous number line.”'
    ],
    discussionCount: 32,
    isNewRelease: false,
    chapters: [
      {
        id: 'g5-m-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Anatomy of Prime Numbers and Factor Trees',
        estimatedReadTimeMin: 12,
        content: `Every whole number greater than 1 is either a prime number or can be uniquely factored into a product of primes. This is known as the Fundamental Theorem of Arithmetic.

Why are prime numbers called the "atoms of mathematics"? Because no matter how massive an integer is, it is constructed by multiplying together these indivisible numerical building blocks.

Consider the number 360:
1. Divide by 2: 360 = 2 × 180
2. Divide by 2: 180 = 2 × 90
3. Divide by 2: 90 = 2 × 45
4. Divide by 3: 45 = 3 × 15
5. Divide by 3: 15 = 3 × 5
Therefore, 360 = 2³ × 3² × 5¹.

Once you master prime factorization, calculating the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) becomes mechanical and foolproof. For any two numbers a and b:
GCD(a, b) × LCM(a, b) = a × b.`
      },
      {
        id: 'g5-m-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: Fractions as Precise Numbers and Visual Area Models',
        estimatedReadTimeMin: 15,
        content: `Many students struggle with fraction multiplication because they attempt to memorize algorithms without visual intuition.

When you multiply 1/2 by 3/4, what does it truly signify?
It means taking "one half OF three quarters".
If you shade 3 vertical strips of a rectangle divided into 4 columns, you have 3/4. Now draw a horizontal line right through the center: you have divided that shaded region into 2 equal tiers. One tier represents exactly 3 out of 8 total sub-rectangles:
(1 × 3) / (2 × 4) = 3/8.`
      }
    ],
    reviews: [
      {
        id: 'rev-g5-1',
        authorName: 'Alex Morgan',
        authorRole: 'Grade 5 Student',
        gradeLevel: '5-sinf',
        rating: 5,
        date: '2026-10-14',
        content: 'The factor trees chapter made prime numbers so crystal clear! My homework marks jumped to 100%.',
        likes: 18
      }
    ]
  },
  {
    id: 'it-grade5-logic-algorithms',
    title: 'Computational Thinking & Algorithmic Logic for Young Minds',
    originalTitle: 'Computer Science Grade 5',
    author: 'Seymour Papert & MIT Education Lab',
    authorBio: 'Legendary MIT mathematicians who founded constructionist learning and educational computation.',
    subject: 'Computer Science & IT',
    grade: 5,
    difficulty: 'Beginner',
    curriculum: 'MIT CS Foundation & Cambridge Computing',
    pages: 220,
    year: 2025,
    rating: 4.9,
    coverImage: '/src/assets/images/book_clean_architecture_1792657116388.jpg',
    description:
      'Introduces Grade 5 students to algorithmic thinking: breaking complex problems into finite logical sequences, deterministic execution, loops, and conditional decision branching (IF / ELSE).',
    keyTheoremsAndConcepts: ['Sequential Execution', 'Deterministic Algorithms', 'Conditional Branching', 'Loop Invariants'],
    quotes: [
      '“Computers do not think; they execute precise instructions with unwavering fidelity.”',
      '“An algorithm is a step-by-step recipe that guarantees a solution in a finite number of steps.”'
    ],
    discussionCount: 26,
    isNewRelease: true,
    chapters: [
      {
        id: 'g5-cs-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: What is an Algorithm? From Mazes to Math',
        estimatedReadTimeMin: 10,
        content: `Imagine instructing a robot to navigate through an unknown labyrinth. If you say "find the exit", the robot cannot proceed because the instruction lacks deterministic steps.

An algorithm must satisfy three inviolable criteria:
1. Definiteness: Every step is unambiguous.
2. Finiteness: The procedure terminates after a finite number of operations.
3. Correctness: It yields the intended output for all valid inputs.

Wall-Follower Algorithm:
Place your right hand against the wall. Walk forward, never breaking contact between your right hand and the wall. In any simply connected maze, this algorithm guarantees reaching the exit without getting trapped in a loop.`
      }
    ],
    reviews: [
      {
        id: 'rev-g5-2',
        authorName: 'Liam Carter',
        authorRole: 'Young Programmer',
        gradeLevel: '5-sinf',
        rating: 5,
        date: '2026-10-18',
        content: 'The maze algorithm experiment was super fun to test in Python!',
        likes: 14
      }
    ]
  },

  // GRADE 6
  {
    id: 'math-grade6-pre-algebra',
    title: 'Pre-Algebra: Ratios, Proportions & Algebraic Equations',
    originalTitle: 'Grade 6 Mathematics: Cambridge Secondary 1',
    author: 'David Patrick, Ph.D.',
    authorBio: 'Distinguished mathematician and national USA Math Olympiad winner.',
    subject: 'Mathematics',
    grade: 6,
    difficulty: 'Beginner',
    curriculum: 'Cambridge Checkpoint & Art of Problem Solving',
    pages: 310,
    year: 2024,
    rating: 4.92,
    coverImage: '/src/assets/images/book_english_math_1792685051986.jpg',
    description:
      'The bridge between arithmetic and abstract algebra. Covers negative numbers on the coordinate plane, proportional reasoning, solving one-step and two-step linear equations, and rates of change.',
    keyTheoremsAndConcepts: ['Balance Scale Principle', 'Proportions & Cross-Multiplication', 'Negative Integers', 'Cartesian Coordinates'],
    quotes: [
      '“An equation is a balanced balance scale: whatever operation you perform on one side, you must mirror on the other.”'
    ],
    discussionCount: 38,
    isNewRelease: false,
    chapters: [
      {
        id: 'g6-m-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Golden Principle of Equations',
        estimatedReadTimeMin: 14,
        content: `In arithmetic, the equals sign "=" is often misinterpreted as "here comes the answer". In algebra, "=" is a declaration of perfect equilibrium between two expressions.

Consider the equation:
3x + 7 = 28

Think of a pan balance. The left pan holds three identical mystery weights (x) plus seven 1-kg blocks. The right pan holds twenty-eight 1-kg blocks.
To isolate the mystery weights:
1. Subtract 7 from both sides:
   3x = 21
2. Divide both sides by 3:
   x = 7

Notice the symmetry: inverse operations preserve truth.`
      }
    ],
    reviews: [
      {
        id: 'rev-g6-1',
        authorName: 'Sophie Bennett',
        authorRole: 'Grade 6 Student',
        gradeLevel: '6-sinf',
        rating: 5,
        date: '2026-10-09',
        content: 'The balance scale visual makes solving equations intuitive. Loved every page.',
        likes: 21
      }
    ]
  },
  {
    id: 'it-grade6-python-basics',
    title: 'Python for Secondary Students: Variables, Loops & Functions',
    originalTitle: 'Grade 6 Computer Science',
    author: 'Eric Matthes & Cambridge CS Panel',
    authorBio: 'Author of worldwide standard textbooks for youth computing and Python education.',
    subject: 'Computer Science & IT',
    grade: 6,
    difficulty: 'Beginner',
    curriculum: 'Cambridge Secondary 1 Computing',
    pages: 290,
    year: 2025,
    rating: 4.94,
    coverImage: '/src/assets/images/book_clean_architecture_1792657116388.jpg',
    description:
      'Clear, practical English guide to Python programming for 6th graders. Students write code to generate prime numbers, plot mathematical Fibonacci spirals, and automate calculations.',
    keyTheoremsAndConcepts: ['Variables & Types', 'For/While Loops', 'Functions & Parameters', 'Mathematical Algorithms in Python'],
    quotes: [
      '“Code is poetry written for machines to execute and humans to understand.”'
    ],
    discussionCount: 30,
    isNewRelease: true,
    chapters: [
      {
        id: 'g6-cs-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Writing Your First Prime Number Checker in Python',
        estimatedReadTimeMin: 13,
        content: `Let us translate our mathematical knowledge of prime numbers into pure, executable Python code.

def is_prime(n):
    if n <= 1:
        return False
    # Check divisors up to square root of n
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

print([x for x in range(2, 50) if is_prime(x)])

Notice why we stop at sqrt(n): if a factor larger than sqrt(n) existed, its counterpart would have already been discovered earlier. This simple mathematical theorem speeds up our code by orders of magnitude!`
      }
    ],
    reviews: [
      {
        id: 'rev-g6-2',
        authorName: 'Murodjon K.',
        authorRole: 'Student',
        gradeLevel: '6-sinf',
        rating: 5,
        date: '2026-10-15',
        content: 'The prime number code was so fast! I used it for my math competition project.',
        likes: 19
      }
    ]
  },

  // GRADE 7
  {
    id: 'math-grade7-linear-algebra',
    title: 'Introduction to Algebra & Multi-Variable Equations',
    originalTitle: 'Cambridge IGCSE Grade 7 Core Math',
    author: 'Karen Morrison & Nick Hamshaw',
    authorBio: 'Cambridge International Assessment senior examiners and mathematics fellows.',
    subject: 'Mathematics',
    grade: 7,
    difficulty: 'Intermediate',
    curriculum: 'Cambridge IGCSE Core',
    pages: 340,
    year: 2024,
    rating: 4.91,
    coverImage: '/src/assets/images/book_english_math_1792685051986.jpg',
    description:
      'Mastering systems of linear equations, linear functions on the Cartesian plane ($y = mx + c$), gradient calculations, and algebraic factorization for Grade 7 scholars.',
    keyTheoremsAndConcepts: ['Slope-Intercept Form', 'Substitution & Elimination', 'Systems of Equations', 'Inequality Sets'],
    quotes: [
      '“The slope of a line represents its constant rate of change across eternity.”'
    ],
    discussionCount: 42,
    isNewRelease: false,
    chapters: [
      {
        id: 'g7-m-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Geometry of Slopes and Linear Graphs',
        estimatedReadTimeMin: 15,
        content: `Every straight line in the coordinate plane embodies a linear relationship governed by:
y = mx + c

Where:
• m is the slope (gradient): Δy / Δx (rise over run)
• c is the y-intercept (the value of y when x = 0)

When two linear equations intersect on a graph:
1) y = 2x + 1
2) y = -x + 7

Their point of intersection is the unique coordinate pair (x, y) that satisfies both mathematical realities simultaneously.
2x + 1 = -x + 7
3x = 6  =>  x = 2, y = 5.
The lines intersect at (2, 5).`
      }
    ],
    reviews: [
      {
        id: 'rev-g7-1',
        authorName: 'Emily Watson',
        authorRole: 'Grade 7 Scholar',
        gradeLevel: '7-sinf',
        rating: 5,
        date: '2026-10-11',
        content: 'The explanation of elimination vs substitution solved all my confusion with word problems.',
        likes: 24
      }
    ]
  },
  {
    id: 'it-grade7-web-code',
    title: 'Web Systems & JavaScript Computational Engines',
    originalTitle: 'Computer Science Grade 7',
    author: 'Marijn Haverbeke & Cambridge Panel',
    authorBio: 'Open-source architect and author of foundational computing guides.',
    subject: 'Computer Science & IT',
    grade: 7,
    difficulty: 'Intermediate',
    curriculum: 'Cambridge Computing Grade 7',
    pages: 300,
    year: 2025,
    rating: 4.88,
    coverImage: '/src/assets/images/book_clean_architecture_1792657116388.jpg',
    description:
      'How the modern web functions: client-server architecture, mathematical coordinate rendering on HTML Canvas, event loops, and interactive algorithms in JavaScript.',
    keyTheoremsAndConcepts: ['DOM Tree Geometry', 'Event-Driven Systems', 'Canvas Coordinate Math', 'Asynchronous Execution'],
    quotes: [
      '“The browser is the most ubiquitous virtual machine in human history.”'
    ],
    discussionCount: 28,
    isNewRelease: false,
    chapters: [
      {
        id: 'g7-cs-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Canvas Math & Interactive Coordinate Plotting',
        estimatedReadTimeMin: 14,
        content: `Unlike mathematical graphs where y increases upwards, computer screens position the origin (0, 0) at the TOP-LEFT corner, with y increasing downwards.

To plot a mathematical function y = f(x):
We must translate from Cartesian space to Screen space:
screenX = centerX + mathX * scale
screenY = centerY - mathY * scale

This single minus sign reflects mathematical reality onto the screen canvas.`
      }
    ],
    reviews: [
      {
        id: 'rev-g7-2',
        authorName: 'Sardor IT Jr.',
        authorRole: 'Student Developer',
        gradeLevel: '7-sinf',
        rating: 5,
        date: '2026-10-16',
        content: 'Built my first interactive graphing calculator thanks to Chapter 1!',
        likes: 17
      }
    ]
  },

  // GRADE 8
  {
    id: 'math-grade8-euclidean-geometry',
    title: 'Euclidean Geometry, Congruence & Geometric Proofs',
    originalTitle: 'Grade 8 Geometry & Proofs',
    author: 'Harold R. Jacobs & Dr. Arthur Pendelton',
    authorBio: 'Distinguished geometry educators who emphasize deductive proof and spatial reasoning.',
    subject: 'Mathematics',
    grade: 8,
    difficulty: 'Intermediate',
    curriculum: 'Cambridge Checkpoint & AoPS Geometry',
    pages: 360,
    year: 2024,
    rating: 4.96,
    coverImage: '/src/assets/images/book_english_math_1792685051986.jpg',
    description:
      'The timeless beauty of deductive axiomatic geometry. Covers congruence theorems (SSS, SAS, ASA), similarity ratios, Pythagorean proofs, circle power theorems, and inscribed angles.',
    keyTheoremsAndConcepts: ['Axiomatic Deduction', 'Pythagorean Theorem Proofs', 'Inscribed Angle Theorem', 'Thales Theorem'],
    quotes: [
      '“There is no royal road to geometry.” — Euclid of Alexandria'
    ],
    discussionCount: 45,
    isNewRelease: false,
    chapters: [
      {
        id: 'g8-m-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Elegance of the Pythagorean Theorem',
        estimatedReadTimeMin: 16,
        content: `Theorem: In any right-angled triangle, the area of the square whose side is the hypotenuse is equal to the sum of the areas of the squares on the other two sides:
a² + b² = c²

Euclid’s Proof by Shearing and Rotation:
Consider a large square of side length (a + b).
Its total area is (a + b)² = a² + 2ab + b².

Inside this square, arrange 4 identical right triangles of legs a and b around the boundary. The unshaded interior forms a tilted square of side c, with area c².
Total Area = 4 × (1/2 ab) + c²
a² + 2ab + b² = 2ab + c²
Subtracting 2ab from both sides reveals the eternal truth:
a² + b² = c².`
      }
    ],
    reviews: [
      {
        id: 'rev-g8-1',
        authorName: 'Daniel Zhao',
        authorRole: 'Junior Olympiad Competitor',
        gradeLevel: '8-sinf',
        rating: 5,
        date: '2026-10-12',
        content: 'The visual proof of Pythagoras in Chapter 1 is pure art. Essential reading for all 8th graders.',
        likes: 31
      }
    ]
  },
  {
    id: 'it-grade8-data-structures',
    title: 'Data Structures, Binary Search & Algorithmic Complexity',
    originalTitle: 'Computer Science Grade 8',
    author: 'Aditya Bhargava & Sarah Jenkins',
    authorBio: 'Renowned computer science educators specializing in intuitive structural visual guides.',
    subject: 'Computer Science & IT',
    grade: 8,
    difficulty: 'Intermediate',
    curriculum: 'Cambridge IGCSE Computer Science',
    pages: 310,
    year: 2025,
    rating: 4.93,
    coverImage: '/src/assets/images/book_clean_architecture_1792657116388.jpg',
    description:
      'Foundational computer science structures: Arrays vs Linked Lists, Stacks, Queues, Hash Tables, Binary Search trees, and Big-O computational time complexity analysis.',
    keyTheoremsAndConcepts: ['Big-O Notation', 'Binary Search O(log n)', 'Hash Collisions', 'Linked List Pointers'],
    quotes: [
      '“The difference between O(n) and O(log n) is the difference between a century and a heartbeat.”'
    ],
    discussionCount: 39,
    isNewRelease: true,
    chapters: [
      {
        id: 'g8-cs-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Magic of Logarithmic Search (O(log n))',
        estimatedReadTimeMin: 14,
        content: `Suppose you are searching for a word in an Oxford English Dictionary with 1,000,000 entries.

If you search line by line (Linear Search):
In the worst case, you examine 1,000,000 pages.

If you use Binary Search:
Open the book right in the middle. Is your target word alphabetically before or after? Discard 500,000 pages in one step. Repeat:
1,000,000 -> 500,000 -> 250,000 -> 125,000 -> ... -> 1.
Total maximum steps: log₂(1,000,000) ≈ 20 steps!

Big-O measures the growth rate of required steps as input size n expands toward infinity.`
      }
    ],
    reviews: [
      {
        id: 'rev-g8-2',
        authorName: 'Rayhon T.',
        authorRole: 'Grade 8 Student',
        gradeLevel: '8-sinf',
        rating: 5,
        date: '2026-10-17',
        content: 'Big-O notation finally makes complete sense. Binary search is like magic!',
        likes: 22
      }
    ]
  },

  // GRADE 9
  {
    id: 'math-grade9-advanced-algebra',
    title: 'Advanced Algebra: Quadratics, Polynomials & Vieta’s Formulas',
    originalTitle: 'Cambridge IGCSE Additional Mathematics (0606)',
    author: 'Michael Haese & Mark Humphries',
    authorBio: 'International Baccalaureate and Cambridge Additional Mathematics series editors.',
    subject: 'Mathematics',
    grade: 9,
    difficulty: 'Advanced',
    curriculum: 'Cambridge IGCSE Additional Math (0606)',
    pages: 410,
    year: 2024,
    rating: 4.95,
    coverImage: '/src/assets/images/book_english_math_1792685051986.jpg',
    description:
      'Rigorous 9th grade curriculum: deriving the quadratic formula, discriminant (Δ) behavior, Vieta’s relations between roots and coefficients, binomial theorem, and polynomial division.',
    keyTheoremsAndConcepts: ['Quadratic Derivation', 'Discriminant Theorem', 'Vieta’s Formulas', 'Binomial Expansion'],
    quotes: [
      '“Vieta’s formulas weave an unbreakable bridge between roots and polynomial coefficients.”'
    ],
    discussionCount: 48,
    isNewRelease: false,
    chapters: [
      {
        id: 'g9-m-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Completing the Square and Deriving the Quadratic Formula',
        estimatedReadTimeMin: 15,
        content: `Given ax² + bx + c = 0 with a ≠ 0:
Divide throughout by a:
x² + (b/a)x + c/a = 0

Move the constant term to the right:
x² + (b/a)x = -c/a

Complete the square by adding (b / 2a)² to both sides:
x² + (b/a)x + (b/2a)² = (b²/4a²) - (c/a)
(x + b/2a)² = (b² - 4ac) / 4a²

Taking the square root of both sides:
x + b/2a = ±√(b² - 4ac) / 2a
x = (-b ± √(b² - 4ac)) / 2a.

The quantity Δ = b² - 4ac determines the nature of the roots:
• If Δ > 0: two distinct real roots.
• If Δ = 0: one repeated real root.
• If Δ < 0: two complex conjugate roots.`
      }
    ],
    reviews: [
      {
        id: 'rev-g9-1',
        authorName: 'Jahongir B.',
        authorRole: 'Grade 9 Additional Math Student',
        gradeLevel: '9-sinf',
        rating: 5,
        date: '2026-10-13',
        content: 'The step-by-step derivation of the quadratic formula is the best I have ever seen.',
        likes: 27
      }
    ]
  },
  {
    id: 'it-grade9-recursion-graphs',
    title: 'Algorithms, Recursion & Graph Traversal Systems',
    originalTitle: 'Grade 9 Computer Science & Discrete Logic',
    author: 'Robert Sedgewick (Princeton) & Kevin Wayne',
    authorBio: 'Legendary authors of Princeton University algorithms curriculum.',
    subject: 'Computer Science & IT',
    grade: 9,
    difficulty: 'Advanced',
    curriculum: 'USACO Bronze & Cambridge Advanced Computing',
    pages: 390,
    year: 2025,
    rating: 4.97,
    coverImage: '/src/assets/images/book_clean_architecture_1792657116388.jpg',
    description:
      'Delves into recursive problem decomposition, the call stack, Depth-First Search (DFS), Breadth-First Search (BFS), and shortest path algorithms for Grade 9 competitive programmers.',
    keyTheoremsAndConcepts: ['Recursive Base Cases', 'DFS & BFS', 'Call Stack Mechanics', 'Topological Sort'],
    quotes: [
      '“To understand recursion, you must first understand recursion.”'
    ],
    discussionCount: 41,
    isNewRelease: true,
    chapters: [
      {
        id: 'g9-cs-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Recursion and the Mathematical Call Stack',
        estimatedReadTimeMin: 16,
        content: `Every recursive function requires two essential ingredients:
1. Base Case: The termination condition that returns a value without further recursion.
2. Recursive Step: Transforming the input towards the base case.

Consider calculating the factorial of n:
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

When factorial(4) is executed:
factorial(4) calls factorial(3)
  factorial(3) calls factorial(2)
    factorial(2) calls factorial(1) -> returns 1
  factorial(2) resumes: 2 * 1 = 2
factorial(3) resumes: 3 * 2 = 6
factorial(4) resumes: 4 * 6 = 24.

Graph Traversal (DFS):
DFS explores as far along each branch as possible before backtracking, directly mirroring this recursive call stack.`
      }
    ],
    reviews: [
      {
        id: 'rev-g9-2',
        authorName: 'Azizbek IT',
        authorRole: 'Grade 9 Olympiad Competitor',
        gradeLevel: '9-sinf',
        rating: 5,
        date: '2026-10-19',
        content: 'Helped me qualify for the national informatics round. DFS and BFS are explained with perfection.',
        likes: 33
      }
    ]
  },

  // GRADE 10
  {
    id: 'math-grade10-trigonometry-vectors',
    title: 'Trigonometry, Coordinate Geometry & 3D Vectors',
    originalTitle: 'Cambridge AS-Level Mathematics (9709)',
    author: 'I.M. Gelfand & Mark Saul',
    authorBio: 'Pioneering world mathematicians whose masterclasses trained Olympiad medalists.',
    subject: 'Mathematics',
    grade: 10,
    difficulty: 'Advanced',
    curriculum: 'Cambridge AS-Level & Pre-Calculus',
    pages: 440,
    year: 2024,
    rating: 4.97,
    coverImage: '/src/assets/images/book_english_math_1792685051986.jpg',
    description:
      'Rigorous exploration of unit circle trigonometry, radians, compound angle identities (sin(A+B), cos(A+B)), vector dot products, and coordinate geometry in two and three dimensions.',
    keyTheoremsAndConcepts: ['Unit Circle Radians', 'Trigonometric Identities', 'Dot Product & Orthogonality', 'Vector Projections'],
    quotes: [
      '“Trigonometry is the algebraic bridge between angular rotation and linear displacement.”'
    ],
    discussionCount: 52,
    isNewRelease: false,
    chapters: [
      {
        id: 'g10-m-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Unit Circle and Universal Angular Definitions',
        estimatedReadTimeMin: 18,
        content: `Right-triangle trigonometry (SOH CAH TOA) collapses when angles exceed 90°. The Unit Circle liberates trigonometry into a continuous periodic domain.

On a circle of radius 1 centered at the origin:
Any angle θ measured counterclockwise from the positive x-axis defines a coordinate:
(x, y) = (cos θ, sin θ)

Because the equation of the unit circle is x² + y² = 1:
It follows immediately that:
cos² θ + sin² θ = 1 (The Fundamental Pythagorean Trigonometric Identity).

This identity holds for ALL real numbers θ, whether 0, 1000°, or -π radians.`
      }
    ],
    reviews: [
      {
        id: 'rev-g10-1',
        authorName: 'Kamran Aliyev',
        authorRole: 'Grade 10 Cambridge Student',
        gradeLevel: '10-sinf',
        rating: 5,
        date: '2026-10-07',
        content: 'Finally understood radians and why 2π represents a full revolution.',
        likes: 36
      }
    ]
  },
  {
    id: 'it-grade10-database-systems',
    title: 'Relational Database Theory & Backend System Architecture',
    originalTitle: 'Grade 10 Computer Science: Systems & Data',
    author: 'Martin Kleppmann & Alexander Chen',
    authorBio: 'Cambridge University distributed systems researchers and software architects.',
    subject: 'Computer Science & IT',
    grade: 10,
    difficulty: 'Advanced',
    curriculum: 'Cambridge A-Level Computing & System Design',
    pages: 420,
    year: 2025,
    rating: 4.96,
    coverImage: '/src/assets/images/book_clean_architecture_1792657116388.jpg',
    description:
      'Grade 10 deep dive into relational algebra, SQL optimization, B-Tree indexes, ACID guarantees, transaction isolation, and client-server backend architecture.',
    keyTheoremsAndConcepts: ['Relational Algebra', 'B-Tree Indexing', 'ACID Transactions', 'Normalized Schema Design'],
    quotes: [
      '“Data is the enduring asset; code is merely the temporary machinery built to query it.”'
    ],
    discussionCount: 36,
    isNewRelease: true,
    chapters: [
      {
        id: 'g10-cs-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: How Databases Use B-Trees to Query Millions in Milliseconds',
        estimatedReadTimeMin: 15,
        content: `When a table contains 10,000,000 records, executing "SELECT * WHERE student_id = 4521" without an index requires scanning all 10 million rows from disk.

A B-Tree (Balanced Tree) structure organizes keys such that every internal node contains multiple keys and child pointers, keeping tree depth remarkably shallow (often 3 to 4 levels).
At branching factor 100:
Level 1: 100 keys
Level 2: 10,000 keys
Level 3: 1,000,000 keys
Level 4: 100,000,000 keys!

Finding any student record requires at most 4 disk accesses, turning a 10-second wait into 2 milliseconds.`
      }
    ],
    reviews: [
      {
        id: 'rev-g10-2',
        authorName: 'Malika K.',
        authorRole: 'Student System Architect',
        gradeLevel: '10-sinf',
        rating: 5,
        date: '2026-10-15',
        content: 'B-tree indexing chapter made database tuning so clear.',
        likes: 29
      }
    ]
  },

  // GRADE 11
  {
    id: 'math-grade11-ap-calculus',
    title: 'AP Calculus BC & Mathematical Analysis: Limits to Integrals',
    originalTitle: 'Cambridge A-Level & AP Calculus BC',
    author: 'James Stewart & Prof. Alisher Qosimov',
    authorBio: 'Legendary calculus textbook author and international mathematical analysis scholars.',
    subject: 'Mathematics',
    grade: 11,
    difficulty: 'Olympiad',
    curriculum: 'Cambridge A-Level Math (9709) & AP Calculus BC',
    pages: 580,
    year: 2025,
    rating: 4.99,
    coverImage: '/src/assets/images/book_english_math_1792685051986.jpg',
    description:
      'The pinnacle of secondary school mathematics: epsilon-delta limits, derivative differentiation rules, Taylor series, Riemann integration, and the Fundamental Theorem of Calculus.',
    keyTheoremsAndConcepts: ['Epsilon-Delta Definition', 'Derivative Chain Rule', 'Fundamental Theorem of Calculus', 'Taylor Series Approximations'],
    quotes: [
      '“Calculus is the language in which God wrote the laws of physics and celestial motion.” — Isaac Newton'
    ],
    discussionCount: 64,
    isNewRelease: true,
    chapters: [
      {
        id: 'g11-m-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Rigorous Foundations of Limits and Derivatives',
        estimatedReadTimeMin: 20,
        content: `What is the instantaneous velocity of a falling apple at the exact second t = 2?
If we compute average speed over time interval Δt:
v_avg = [s(t + Δt) - s(t)] / Δt

If we set Δt = 0 directly, we obtain 0 / 0 — mathematical nonsense.
Calculus resolves this through the concept of a Limit:
f'(x) = lim (h -> 0) [f(x + h) - f(x)] / h

Let f(x) = x²:
[ (x + h)² - x² ] / h = [ x² + 2xh + h² - x² ] / h = (2xh + h²) / h = 2x + h.
As h approaches 0:
lim (h -> 0) (2x + h) = 2x.

We have arrived at the derivative without ever dividing by zero!`
      }
    ],
    reviews: [
      {
        id: 'rev-g11-1',
        authorName: 'Farrux Rustamov',
        authorRole: 'Grade 11 AP Calculus Scholar',
        gradeLevel: '11-sinf',
        rating: 5,
        date: '2026-10-18',
        content: 'Masterpiece textbook! Secured a score of 5 on the AP Calculus mock exam.',
        likes: 44
      }
    ]
  },
  {
    id: 'it-grade11-machine-learning',
    title: 'Machine Learning Mathematics & Neural Network Engineering',
    originalTitle: 'Grade 11 Advanced Computing',
    author: 'Ian Goodfellow & Sarah Jenkins',
    authorBio: 'World-renowned AI research scientists and university curriculum directors.',
    subject: 'Computer Science & IT',
    grade: 11,
    difficulty: 'Olympiad',
    curriculum: 'MIT 6.036 & Cambridge Advanced AI',
    pages: 490,
    year: 2026,
    rating: 4.98,
    coverImage: '/src/assets/images/book_clean_architecture_1792657116388.jpg',
    description:
      'Where Grade 11 Mathematics and IT unite: Matrix transformations, partial derivatives, gradient descent optimization, loss functions, and coding a perceptron from scratch in Python.',
    keyTheoremsAndConcepts: ['Matrix Multiplication', 'Partial Derivatives', 'Gradient Descent', 'Backpropagation'],
    quotes: [
      '“Deep learning is applied multivariable calculus and linear algebra executed at scale.”'
    ],
    discussionCount: 57,
    isNewRelease: true,
    chapters: [
      {
        id: 'g11-cs-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Gradient Descent: Finding the Global Minimum',
        estimatedReadTimeMin: 18,
        content: `Training a neural network is mathematically equivalent to minimizing an error function L(w).

Imagine you are standing on a foggy mountainside where you cannot see the valley floor. How do you descend?
You feel the slope of the ground beneath your boots and take a step in the direction of steepest descent.

The Gradient Vector ∇L contains the partial derivatives with respect to each weight:
w_new = w_old - η * ∇L

Where η is the learning rate.
If η is too large, the optimizer overshoots the minimum and diverges. If η is too small, convergence takes millions of epochs. This is the profound harmony of calculus, linear algebra, and computer science!`
      }
    ],
    reviews: [
      {
        id: 'rev-g11-2',
        authorName: 'Jasur Bek',
        authorRole: 'Senior Secondary AI Researcher',
        gradeLevel: '11-sinf',
        rating: 5,
        date: '2026-10-21',
        content: 'The bridge between calculus derivatives and neural network backpropagation is explained with unmatched clarity.',
        likes: 38
      }
    ]
  }
];

export const INITIAL_DISCUSSIONS: DiscussionThread[] = [
  {
    id: 'disc-math-g11-1',
    bookId: 'math-grade11-ap-calculus',
    title: 'The intuition behind Epsilon-Delta Limit proofs: How to explain it visually?',
    content:
      'In Chapter 1, Cauchy’s formal definition of a limit is introduced: for every ε > 0, there exists a δ > 0 such that 0 < |x - c| < δ implies |f(x) - L| < ε. What is the most intuitive geometric way to explain this to a secondary student who is used to just plugging in numbers?',
    authorId: 'usr-farrux',
    authorName: 'Farrux Rustamov',
    authorAvatar: 'FR',
    authorRole: 'Grade 11 AP Scholar',
    createdAt: 'Bugun, 08:30',
    upvotes: 24,
    isSpoiler: false,
    tag: 'Calculus Proofs',
    replies: [
      {
        id: 'rep-m-1',
        threadId: 'disc-math-g11-1',
        authorId: 'admin-math-cambridge',
        authorName: 'Dr. Arthur Pendelton',
        authorAvatar: 'AP',
        authorRole: 'Lead Mathematics Curator',
        content:
          'Think of ε as an error tolerance challenged by an opponent: "Can you keep the output within this target band around L?" Your response δ is your required input precision dial: "Yes, provided x is within δ of c, the output will never escape your error band."',
        createdAt: 'Bugun, 09:12',
        upvotes: 19
      }
    ]
  },
  {
    id: 'disc-cs-g8-1',
    bookId: 'it-grade8-data-structures',
    title: 'Why Binary Search requires a pre-sorted array: Can we achieve O(log n) on unsorted data?',
    content:
      'If sorting an array takes O(n log n), when is it mathematically justified to sort an array first just to run binary search? If we only perform 1 search, is linear search O(n) faster?',
    authorId: 'usr-rayhon',
    authorName: 'Rayhon T.',
    authorAvatar: 'RT',
    authorRole: 'Grade 8 Student',
    createdAt: 'Kecha, 16:40',
    upvotes: 29,
    isSpoiler: false,
    tag: 'Algorithm Complexity',
    replies: [
      {
        id: 'rep-cs-1',
        threadId: 'disc-cs-g8-1',
        authorId: 'admin-cs-algorithms',
        authorName: 'Sarah Jenkins, M.Sc.',
        authorAvatar: 'SJ',
        authorRole: 'Chief CS Architect',
        content:
          'Spot-on question! For a single search: O(n) is much faster than sorting first (O(n log n)). However, if you perform k searches, binary search cost is O(n log n + k log n) whereas linear search is O(k * n). Once k > log n, sorting once pays huge mathematical dividends!',
        createdAt: 'Kecha, 18:05',
        upvotes: 22
      }
    ]
  },
  {
    id: 'disc-math-g8-1',
    bookId: 'math-grade8-euclidean-geometry',
    title: 'Dissecting Euclid’s 5th Postulate (The Parallel Postulate) and non-Euclidean space',
    content:
      'In Chapter 1, we prove the Pythagorean theorem in a flat Euclidean plane. Does the Pythagorean theorem hold true on the surface of a sphere (like Earth’s globe), or does curvature invalidate a² + b² = c²?',
    authorId: 'usr-daniel',
    authorName: 'Daniel Zhao',
    authorAvatar: 'DZ',
    authorRole: 'Grade 8 Olympiad Competitor',
    createdAt: '2 kun oldin',
    upvotes: 35,
    isSpoiler: false,
    tag: 'Geometry Proofs',
    replies: [
      {
        id: 'rep-m-2',
        threadId: 'disc-math-g8-1',
        authorId: 'admin-stem-discrete',
        authorName: 'Prof. Alisher Qosimov',
        authorAvatar: 'AQ',
        authorRole: 'Discrete Math Chair',
        content:
          'Brilliant insight, Daniel! On a sphere, the angles of a triangle sum to MORE than 180°, and the Pythagorean theorem does not hold. Instead, spherical trigonometry uses: cos(c/R) = cos(a/R) * cos(b/R). As R -> infinity, it reduces back to a² + b² = c²!',
        createdAt: '1 kun oldin',
        upvotes: 26
      }
    ]
  }
];

export const INITIAL_CONTACTS: UserContact[] = [
  {
    id: 'admin-math-cambridge',
    name: 'Dr. Arthur Pendelton',
    avatar: 'AP',
    role: 'Lead Mathematics Curator (Grades 5-11)',
    status: 'online',
    currentReading: 'AP Calculus BC & Analysis',
    unreadCount: 1,
    messages: [
      {
        id: 'm-math-1',
        senderId: 'admin-math-cambridge',
        senderName: 'Dr. Arthur Pendelton',
        text: 'Welcome to the English Mathematics & IT Platform! I am here to assist with any math question from Grade 5 arithmetic through Grade 11 AP Calculus.',
        timestamp: '09:00',
        isRead: false
      }
    ]
  },
  {
    id: 'admin-cs-algorithms',
    name: 'Sarah Jenkins, M.Sc.',
    avatar: 'SJ',
    role: 'Chief Computer Science Architect',
    status: 'reading',
    currentReading: 'Machine Learning Mathematics',
    unreadCount: 0,
    messages: [
      {
        id: 'm-cs-1',
        senderId: 'admin-cs-algorithms',
        senderName: 'Sarah Jenkins, M.Sc.',
        text: 'Hello! Feel free to ask about Python code implementations, Big-O algorithm efficiency, or database structures.',
        timestamp: 'Kecha',
        isRead: true
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-math-1',
    type: 'new_book',
    title: 'New English Math Release (Grade 11)',
    message: '"AP Calculus BC & Mathematical Analysis: Limits to Integrals" has been added to the library.',
    timestamp: '15 daqiqa oldin',
    isRead: false,
    bookId: 'math-grade11-ap-calculus'
  },
  {
    id: 'notif-math-2',
    type: 'discussion',
    title: 'New Discussion in Grade 8 Geometry',
    message: 'Prof. Alisher Qosimov replied to Daniel’s question on Spherical Geometry.',
    timestamp: '1 soat oldin',
    isRead: false,
    bookId: 'math-grade8-euclidean-geometry',
    threadId: 'disc-math-g8-1'
  }
];
