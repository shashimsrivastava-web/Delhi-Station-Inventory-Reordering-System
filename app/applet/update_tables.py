with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Update headers
old_header = '<th className="p-4">Packaging Hierarchy</th>\n                                  <th className="p-4">Consumption</th>'
new_header = '<th className="p-4">Packaging Hierarchy</th>\n                                   <th className="p-4">Quantity Details</th>\n                                   <th className="p-4">Add Info</th>\n                                   <th className="p-4">Consumption</th>'

count = content.count(old_header)
print(f"Found {count} header occurrences to replace.")
content = content.replace(old_header, new_header)

# 2. Update row cells
old_cell_transition = '''                                     <td className="p-4">
                                       <div className="space-y-0.5">
                                         <div>1 Pack = {article.boxes_per_pack} Boxes</div>
                                         <div>1 Box = {article.units_per_box} {article.smallest_unit_name}s</div>
                                         <div className="font-semibold text-amber-700">
                                           Total Pack: {(article.boxes_per_pack * article.units_per_box).toLocaleString()} {article.smallest_unit_name}s
                                         </div>
                                       </div>
                                     </td>
                                     <td className="p-4">'''

new_cell_transition = '''                                     <td className="p-4">
                                       <div className="space-y-0.5">
                                         <div>1 Pack = {article.boxes_per_pack} Boxes</div>
                                         <div>1 Box = {article.units_per_box} {article.smallest_unit_name}s</div>
                                         <div className="font-semibold text-amber-700">
                                           Total Pack: {(article.boxes_per_pack * article.units_per_box).toLocaleString()} {article.smallest_unit_name}s
                                         </div>
                                       </div>
                                     </td>
                                     <td className="p-4">
                                       <div className="font-mono text-slate-700">{article.quantity_details || <span className="text-slate-300 italic">N/A</span>}</div>
                                     </td>
                                     <td className="p-4">
                                       <div className="text-slate-700">{article.add_info || <span className="text-slate-300 italic">N/A</span>}</div>
                                     </td>
                                     <td className="p-4">'''

cell_count = content.count(old_cell_transition)
print(f"Found {cell_count} row cell occurrences to replace.")
content = content.replace(old_cell_transition, new_cell_transition)

# 3. Update colSpan={8} to colSpan={10}
content = content.replace('colSpan={8}', 'colSpan={10}')

with open('app/page.tsx', 'w') as f:
    f.write(content)
print("Successfully updated app/page.tsx with Quantity Details and Add Info columns!")
