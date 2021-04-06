StartRule = Decision _ Action _ On _ ResourceList Condition

Decision = 'Allow' / 'Deny'

Action = 'create' / 'read'

On = 'on'

ResourceList = Resource ',' ResourceList / Resource

Condition = (_('if' / 'where') Attribute Operator Value)?

Resource = _[A-Za-z.]+

Attribute = _[A-Za-z.]+

Operator = _('!=' /'<' )

Value = _[A-Za-z0-9']+

_ = [ \t\n\r]*