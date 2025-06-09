import re

class MiniInterpreter:
    """
    Mini Interpreter
    
    Evaluates let variable declarations and if conditions from input strings.
    Supports basic arithmetic and boolean operations.
    """
    
    def __init__(self):
        self.variables = {}
        self.execution_steps = []
    
    def evaluate(self, code):
        """
        Evaluate the given code string
        
        Args:
            code: String containing let declarations and if conditions
            
        Returns:
            dict: Evaluation result with variables and execution steps
        """
        self.variables = {}
        self.execution_steps = []
        
        try:
            # Split code into statements
            statements = self._parse_statements(code)
            result = None
            
            for statement in statements:
                result = self._execute_statement(statement.strip())
            
            return {
                'result': result,
                'variables': dict(self.variables),
                'steps': list(self.execution_steps)
            }
        
        except Exception as e:
            return {
                'result': f'Error: {str(e)}',
                'variables': dict(self.variables),
                'steps': list(self.execution_steps)
            }
    
    def _parse_statements(self, code):
        """Parse code into individual statements"""
        # Remove comments and extra whitespace
        code = re.sub(r'#.*', '', code)  # Remove comments
        code = re.sub(r'\s+', ' ', code.strip())  # Normalize whitespace
        
        # Split by semicolons or newlines
        statements = re.split(r'[;\n]', code)
        return [stmt.strip() for stmt in statements if stmt.strip()]
    
    def _execute_statement(self, statement):
        """Execute a single statement"""
        # Let declaration: let x = expression
        let_match = re.match(r'let\s+(\w+)\s*=\s*(.+)', statement)
        if let_match:
            var_name = let_match.group(1)
            expression = let_match.group(2)
            value = self._evaluate_expression(expression)
            self.variables[var_name] = value
            self.execution_steps.append(f'let {var_name} = {expression} → {value}')
            return value
        
        # If condition: if (condition) then expression else expression
        if_match = re.match(r'if\s*\(([^)]+)\)\s*then\s+(.+?)\s+else\s+(.+)', statement)
        if if_match:
            condition = if_match.group(1)
            then_expr = if_match.group(2)
            else_expr = if_match.group(3)
            
            condition_result = self._evaluate_expression(condition)
            if condition_result:
                result = self._evaluate_expression(then_expr)
                self.execution_steps.append(f'if ({condition}) → True, result: {result}')
            else:
                result = self._evaluate_expression(else_expr)
                self.execution_steps.append(f'if ({condition}) → False, result: {result}')
            
            return result
        
        # Simple expression evaluation
        result = self._evaluate_expression(statement)
        self.execution_steps.append(f'{statement} → {result}')
        return result
    
    def _evaluate_expression(self, expression):
        """Evaluate a mathematical or boolean expression"""
        expression = expression.strip()
        
        # Handle boolean literals
        if expression.lower() == 'true':
            return True
        if expression.lower() == 'false':
            return False
        
        # Handle numeric literals
        if re.match(r'^-?\d+$', expression):
            return int(expression)
        
        # Handle variable references
        if re.match(r'^\w+$', expression):
            if expression in self.variables:
                return self.variables[expression]
            else:
                raise ValueError(f'Undefined variable: {expression}')
        
        # Handle comparison operations
        comparison_ops = [('<=', lambda x, y: x <= y), ('>=', lambda x, y: x >= y),
                         ('<', lambda x, y: x < y), ('>', lambda x, y: x > y),
                         ('==', lambda x, y: x == y), ('!=', lambda x, y: x != y)]
        
        for op, func in comparison_ops:
            if op in expression:
                parts = expression.split(op, 1)
                if len(parts) == 2:
                    left = self._evaluate_expression(parts[0].strip())
                    right = self._evaluate_expression(parts[1].strip())
                    return func(left, right)
        
        # Handle arithmetic operations (order matters for precedence)
        arithmetic_ops = [
            ('+', lambda x, y: x + y),
            ('-', lambda x, y: x - y),
            ('*', lambda x, y: x * y),
            ('//', lambda x, y: x // y),
            ('/', lambda x, y: x / y),
            ('%', lambda x, y: x % y)
        ]
        
        # Simple left-to-right evaluation (no proper precedence for simplicity)
        for op, func in arithmetic_ops:
            if op in expression:
                parts = expression.split(op, 1)
                if len(parts) == 2:
                    left = self._evaluate_expression(parts[0].strip())
                    right = self._evaluate_expression(parts[1].strip())
                    return func(left, right)
        
        # Handle parentheses (simple case)
        paren_match = re.match(r'^\((.+)\)$', expression)
        if paren_match:
            return self._evaluate_expression(paren_match.group(1))
        
        raise ValueError(f'Cannot evaluate expression: {expression}')