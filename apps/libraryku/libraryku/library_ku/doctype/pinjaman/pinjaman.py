# -*- coding: utf-8 -*-
# Copyright (c) 2019, yudha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Pinjaman(Document):
	pass

	def validate(self):
		self.change_status_buku()
	
	def change_status_buku(self):
		if self.pinjaman_line:
			if self.status == 'On Borrow':
				for i in self.pinjaman_line:
					buku = frappe.get_doc("Master Buku",i.code_buku)
					buku.status = 'Borrowed'
					buku.save()